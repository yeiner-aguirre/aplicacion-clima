import { useEffect, useState } from "react";

const resolveInitialValue = (initialValue) =>
  typeof initialValue === "function" ? initialValue() : initialValue;

export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") {
      return resolveInitialValue(initialValue);
    }

    try {
      const savedValue = window.localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }
    } catch {
      return resolveInitialValue(initialValue);
    }

    return resolveInitialValue(initialValue);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      return;
    }
  }, [key, state]);

  return [state, setState];
}
