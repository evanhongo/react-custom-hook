import { useState, useEffect } from 'react';

export default function useLocalStorage(key){
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || null
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
}