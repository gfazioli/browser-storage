import { useState } from "react";
import { Session } from "./utils/session";

/**
 * Store a value in the browser session storage.
 *
 * @param {string} iKey - Unique id.
 * @param {*} initialValue - Initial value.
 *
 * @returns [storedValue, setValue]
 *
 * @example
 *
 * const [value,setValue] = useSessionStorage("hello", "world");
 */
export const useSessionStorage = (iKey: string, initialValue: unknown): unknown => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      return Session.get(iKey, initialValue);
    } catch (error) {
      // If error also return initialValue
      console.error("👺 useSessionStorage", error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue = (value: unknown) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      Session.set(iKey, valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error("👺 useSessionStorage", error);
    }
  };

  return [storedValue, setValue];
};
