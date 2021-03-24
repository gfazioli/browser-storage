import { useEffect, useState } from "react";
import { Local } from "./utils/local";
/**
 * Store a value in the browser local storage.
 *
 * @param {string} iKey - Unique id.
 * @param {*} initialValue - Initial value.
 *
 * @returns [storedValue, setValue]
 *
 * @example
 *
 * const [value,setValue] = useLocalStorage("hello", "world");
 */
export const useLocalStorage = (iKey: string, initialValue: unknown): unknown => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === "undefined") {
        return null;
      }
      // Get from local storage by key
      return Local.get(iKey, initialValue);
    } catch (error) {
      // If error also return initialValue
      console.error("👺 useLocalStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    const value = Local.get(iKey, initialValue);
    setStoredValue(value);
  }, [iKey]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: unknown) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      Local.set(iKey, valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error("👺 useLocalStorage", error);
    }
  };

  return [storedValue, setValue];
};
