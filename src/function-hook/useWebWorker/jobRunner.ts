import { WORKER_STATUS, TRANSFERABLE_TYPE } from './'

interface JOB_RUNNER_OPTIONS {
  fn: Function,
  transferable: TRANSFERABLE_TYPE
}

/**
 * This function accepts as a parameter a function "userFunc"
 * And as a result returns an anonymous function.
 * This anonymous function, accepts as arguments,
 * the parameters to pass to the function "useArgs" and returns a Promise
 * This function can be used as a wrapper, only inside a Worker
 * because it depends by "postMessage".
 *
 * @param {Function} userFunc {Function} fn the function to run with web worker
 *
 * @returns {Function} returns a function that accepts the parameters
 * to be passed to the "userFunc" function
 */

const jobRunner = (options: JOB_RUNNER_OPTIONS): Function => async (e: MessageEvent) => {
  const [userFuncArgs] = e.data as [any[]]
  try { 
    const result = await Promise.resolve(options.fn(...userFuncArgs))
    const isTransferable = (val_1: any) => (
      ('ArrayBuffer' in self && val_1 instanceof ArrayBuffer)
      || ('MessagePort' in self && val_1 instanceof MessagePort)
      || ('ImageBitmap' in self && val_1 instanceof ImageBitmap)
      // @ts-ignore
      || ('OffscreenCanvas' in self && val_1 instanceof OffscreenCanvas)
    )
    const transferList: any[] = options.transferable === TRANSFERABLE_TYPE.AUTO && isTransferable(result) ? [result] : []
    // @ts-ignore
    postMessage([WORKER_STATUS.SUCCESS, result], transferList)
  } catch (error) {
    // @ts-ignore
    postMessage([WORKER_STATUS.ERROR, error])
  }
}

export default jobRunner;