import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TDebounce = [string, Dispatch<SetStateAction<string>>];

const useDebounce = (initialValue: string, delay: number): TDebounce => {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debounceValue, setDebounceValue] = useState(initialValue);

  useEffect(() => {
    const debounceId = setTimeout(() => setDebounceValue(actualValue), delay);
    return () => clearTimeout(debounceId);
  }, [actualValue, delay]);

  return [debounceValue, setActualValue];
};

export default useDebounce;
