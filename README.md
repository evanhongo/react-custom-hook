# useWebWorker()
## Usage

```js
const [workerFn, controller] = useWorker(fn, options);
```

## Hook API

| Value | Type | Description |
| --- | --- | --- |
| fn | Function | The `pure function` to run with web workers |
| workerFn | Promise | The `function` that allows you to run `fn` with web worker |
| controller | Object | Hook controller ( see Controller API) |
| options | Object | The object containing the options of the worker |

## Controller API

| Value | Type | Description |
| --- | --- | --- |
| status | `WORKER_STATUS` | The status of `workerFn` |
| kill | Function | The function that allows killing the worker |

## Options API

| Value | Type | Default | Description |
| --- | --- | --- | --- |
| timeout | Number | undefined | The number of milliseconds before killing the worker |
| remoteDependencies | Array of String | \[\] | An array that contains the remote dependencies needed to run the worker |
| localDependencies | Function of Array of String | () => \[\] | A function that returns an array that contains the local dependencies needed to run the worker |
| autoTerminate | Boolean | true | Kill the worker once it's done (success or error) |
| transferable | String | 'auto' | Enable [Transferable Objects](https://developer.mozilla.org/en-US/docs/Web/API/Transferable), to disable it set transferable: 'none' |

## Local Dependencies Example

### utils.js
```js
export const sortNumbers = nums => nums.sort();
```
### example.js
```js
import { useWebWorker } from "@evanhongo/react-custom-hook";
import { sortNumbers } from "./utils";

const numbers = [...Array(5000000)].map(e => ~~(Math.random() * 1000000));

const Example = () => {
  const [sortWorker, {status: workerStatus, kill: workerTerminate }] = useWebWorker(sortNumbers, {
    timeout: 500000, // 50 seconds
    localDependencies: () => [sortNumbers] // we pass the local function to the worker
  });

  const handleClick = async () => {
    const result = await sortWorker(numbers);
    console.log(result);
  };

  return (
    <button type="button" onClick={handleClick}>
      Add
    </button>
  );
}
```