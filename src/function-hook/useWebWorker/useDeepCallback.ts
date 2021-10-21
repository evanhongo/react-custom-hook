import { useRef, useCallback, DependencyList } from "react";
import dequal from "dequal";

const useDeepCallback = <T extends (...args: any[]) => any>(callback: T, dependencies: DependencyList) => {
  const prevDependencies = useRef<DependencyList>(dependencies)
  const areDeepsEqual = dequal(prevDependencies.current, dependencies)
  if (!areDeepsEqual) {
    prevDependencies.current = dependencies
  }

  return useCallback(callback, prevDependencies.current)
}

export default useDeepCallback;