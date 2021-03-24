import { DEFAULT_CACHE_OPTIONS } from "../../config";
import { Storage } from "./storage";

/**
 * You can use this function to store values in the session storage of the browser for a limited time.
 *
 * @alias cache
 *
 * @param {string} key - Identifier of cooke
 * @param {any} initialValue - The initial value
 * @param {IStorageCacheOptions} options - Options
 *
 * @return {any}
 *
 * @example
 *
 * // store "Hello, World" in the session storage with key "myKey" for 10 seconds
 * const value = await cache("mykey", "Hello, World!");
 *
 * // store a fecth return in the session storage with key "products" for 30 seconds
 * const { data } = await cache("products", () => axios.get(resource), { expire: 30 });
 *
 */

export const cache = (
  iKey: string,
  initialValue: unknown = null,
  options: BROWSERSTORAGE.IStorageCacheOptions = DEFAULT_CACHE_OPTIONS,
): unknown => {
  const { expire = 0 } = options;

  function store() {
    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + expire);

    const cache = {
      expire: expirationTime.getTime(),
      value: initialValue instanceof Function ? initialValue() : initialValue,
    };

    Storage.set(iKey, cache);

    return cache.value;
  }

  try {
    // get from session storage by key
    const cache: BROWSERSTORAGE.ICache = Storage.get(iKey) as BROWSERSTORAGE.ICache;

    if (!cache || expire < 1) {
      return store();
    }

    // check if it's expired
    const now = new Date();
    const time = now.getTime();
    if (time > cache?.expire) {
      console.info("🤔 Cache expired for key ", iKey, time, cache?.expire);
      return store();
    }

    return cache.value;
  } catch (error) {
    // If error also return initialValue
    console.error("👺 Cache", error);
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
};
