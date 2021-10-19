import { useState, useEffect } from "react";

export default function useLocalStorage(key: string){
  const [value, setValue] = useState<string|null>(
    () => localStorage.getItem(key) || null
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}