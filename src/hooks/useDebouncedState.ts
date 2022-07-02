import { useEffect, useState } from 'react';

export default function useDebouncedState<T>(
  initialValue: T,
  debounceTime = 300
): { value: T; finalValue: T; setValue: React.Dispatch<React.SetStateAction<T>> } {
  const [value, setValue] = useState(initialValue);
  const [finalValue, setFinalValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => setFinalValue(value), debounceTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [debounceTime, value]);

  return { value, finalValue, setValue };
}
