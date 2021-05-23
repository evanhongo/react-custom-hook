import { useState, useEffect } from "react";

export default function useTimer() {
  const [secondElapsed, setSecondElapsed] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setSecondElapsed((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return [secondElapsed];
}
