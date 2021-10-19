import { useEffect, useRef, DependencyList } from "react";

const useWatch = (dep: DependencyList, callback: Function) => {
  const prevArray = useRef([]);
  const isInit = useRef<boolean>(false);

  useEffect(() => {
    if (!isInit.current) isInit.current = true;
    else {
      callback(dep, prevArray.current);
      dep.forEach((e, index) => {
        prevArray.current[index] = e;
      });
    }
  }, dep);
};

export default useWatch;
