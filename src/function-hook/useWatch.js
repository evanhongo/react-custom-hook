import { useEffect, useRef } from "react";

const useWatch = (dep, callback) => {
  const prevArray = useRef([]);
  const isInit = useRef(false);

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
