import { useRef } from 'react';

export default function useInterval(callback, interval) {
  const timer = useRef();

  function start() {
    if(!timer.current)
      timer.current = setInterval(callback, interval);
  }

  function stop() {  
    clearInterval(timer.current);
    timer.current = null;
  }

  return [start, stop];
}