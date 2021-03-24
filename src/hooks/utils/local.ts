/**
 * Manage the local storage as inline function.
 *
 * @param {string|array} iKey - Local key or [key, value]
 * @param {unknown} defaultValue - Default value. used when the local key doesn't exist
 *
 * @example
 *
 * // get storage value with a default
 * const value = local("key", "default")
 *
 * // set storage value
 * local(["key", "value"])
 *
 * // set a local value by function
 * local(["key", () => { return "value to store" }])
 *
 * // delete storage value
 * local(["key"])
 *
 *
 */
export const local = (iKey: string | [string, unknown?], d: unknown = null): unknown => {
  if (Array.isArray(iKey)) {
    const [sKey, value] = iKey;
    if (value) {
      const sValue = value instanceof Function ? value() : value;
      return typeof window === "undefined" ? null : window.localStorage.setItem(sKey, JSON.stringify(sValue));
    }
    return typeof window === "undefined" ? null : window.localStorage.removeItem(sKey);
  }

  const value = typeof window === "undefined" ? null : window.localStorage.getItem(iKey);
  return value ? JSON.parse(value) : d instanceof Function ? d() : d;
};

/**
 * Manage the local storage as object.
 *
 * @example
 *
 * // set a local value
 * Local.set("key", "value");
 *
 * // check if the local key exists
 * if(Local.has("key")) {...}
 *
 * // get a local value
 * const value = Local.get("key");
 *
 * // get and remove a local value
 * const value = Local.pull("key");
 *
 * // remove a local value
 * Local.remove("key");
 *
 */
export const Local: BROWSERSTORAGE.ILocal = {
  /**
   * Set a value
   *
   * @param {string} iKey - Local Key
   * @param {unknown} value - unknown value
   */
  set: (iKey: string, value: unknown) => local([iKey, value]),

  /**
   * Return TRUE if a local storage key exists
   *
   * @param {string} iKey - Local key
   *
   * @return {boolean}
   */
  has: (iKey: string): boolean => {
    return !!local(iKey);
  },
  /**
   * Get a local value.
   *
   * @param {string} iKey -Local key
   * @param {unknown} defValue - Optional. The default value when the local doesn't exists
   *
   * @return {unknown}
   */
  get: (iKey: string, defValue: unknown = null): unknown => local(iKey, defValue),
  /**
   * Get and remove a local value.
   *
   * @param {string} iKey - Local key
   * @param {unknown} defValue - Optional. The default value when the local doesn't exists
   *
   * @return {unknown}
   */
  pull: (iKey: string, defValue: unknown): unknown => {
    const value = local(iKey, defValue);
    local([iKey]);
    return value;
  },
  /**
   * Remove (delete) a local value
   *
   * @param {string} iKey - Local key
   */
  remove: (iKey: string) => local([iKey]),
};
