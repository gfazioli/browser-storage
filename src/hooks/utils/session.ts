/**
 * Manage the session storage as inline function.
 *
 * @param {string|array} ikey - Session key or [key, value]
 * @param {unknown} defaultValue - Default value. used when the session key doesn't exist
 *
 * @example
 *
 * // get session value with a default
 * const value = session("key", "default")
 *
 * const value = session("key", () => { return "default" })
 *
 * // set session value
 * session(["key", "value"])
 *
 * // set a session value by function
 * session(["key", () => { return "value to store" }])
 *
 * // delete session value
 * session(["key"])
 *
 *
 */

export const session = (ikey: string | [string, unknown?], defaultValue: unknown = null): unknown => {
  if (Array.isArray(ikey)) {
    const [sKey, value] = ikey;
    if (value) {
      const sValue = value instanceof Function ? value() : value;
      return typeof window === "undefined" ? null : window.sessionStorage.setItem(sKey, JSON.stringify(sValue));
    }
    return typeof window === "undefined" ? null : window.sessionStorage.removeItem(sKey);
  }

  const value = typeof window === "undefined" ? null : window.sessionStorage.getItem(ikey);
  return value ? JSON.parse(value) : defaultValue instanceof Function ? defaultValue() : defaultValue;
};

/**
 * Manage the session storage as object.
 *
 * @example
 *
 * // set a session value
 * Session.set("key", "value");
 *
 * // check if the session key exists
 * if(Session.has("key")) {...}
 *
 * // get a session value
 * const value = Session.get("key");
 *
 * // get and remove a session value
 * const value = Session.pull("key");
 *
 * // remove a session value
 * Session.remove("key");
 *
 */
export const Session: BROWSERSTORAGE.ISession = {
  /**
   * Set a value
   *
   * @param iKey {string} Session Key
   * @param value {any} Any value
   */
  set: (iKey: string, value: unknown) => session([iKey, value]),

  /**
   * Return TRUE if a session storage key exists
   *
   * @param {string} iKey - Session key
   *
   * @return {boolean}
   */
  has: (iKey: string): boolean => {
    return !!session(iKey);
  },
  /**
   * Get a session value.
   *
   * @param {string} iKey - Session key
   * @param {unknown} defValue - Optional. The default value when the session doesn't exists
   *
   * @return {unknown}
   */
  get: (iKey: string, defValue: unknown = null): unknown => session(iKey, defValue),

  /**
   * Get and remove a session value.
   *
   * @param {string} iKey - Session key
   * @param {unknown} defValue - Optional. The default value when the session doesn't exists
   *
   * @return {unknown}
   */
  pull: (iKey: string, defValue: unknown = null): unknown => {
    const value = session(iKey, defValue);
    session([iKey]);
    return value;
  },

  /**
   * Remove (delete) a session value
   *
   * @param {string} iKey - Session key
   */
  remove: (iKey: string) => session([iKey]),
};
