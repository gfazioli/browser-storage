import { useEffect, useState } from "react";
import { DEFAULT_CACHE_OPTIONS } from "../config";
import { cache } from "./utils/cache";

/**
 * Useful hoook to get/store a cache value
 *
 * @param {string} iKey - Cache key
 * @param {any} initialValue - Initial/default value
 * @param {object} options - Options
 *
 * @example
 *
 * // get data from cache with key "myKey"
 * const { data, setCache } = useCache("myKey", fetch)
 *
 * // set/update a cache value
 * setCache("myKey", "New Value", { expire: 40})
 *
 */

export const useCache = (
  iKey: string,
  initialValue: unknown = null,
  options: BROWSERSTORAGE.IStorageCacheOptions = DEFAULT_CACHE_OPTIONS,
): BROWSERSTORAGE.IUseCache => {
  const [data, setData] = useState<unknown>();

  useEffect(() => {
    const res = cache(iKey, initialValue, options);
    setData(res);
  }, [iKey, initialValue, options]);

  const setCache = (value: unknown, options: BROWSERSTORAGE.IStorageCacheOptions = DEFAULT_CACHE_OPTIONS) => {
    cache(iKey, value, options);
    setData(value);
  };

  return { data, setCache };
};
