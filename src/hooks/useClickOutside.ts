import { useEffect, useRef, useState } from "react";

function useClickOutside(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen, setIsOpen, ref };
}

export default useClickOutside;
