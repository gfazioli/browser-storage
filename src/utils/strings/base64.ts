/**
 * Convert any value (string, object, array,...) in a base64
 *
 * @param {any} v Any value (string, object, array,...)
 */

export const toBase64 = <T>(v: T): string => Buffer.from(JSON.stringify(v)).toString("base64");

/**
 * Returns the original value (string, object, array,...) from an encoded base64
 *
 * @param {string} str base64 encoded string
 *
 */
export const fromBase64 = <T>(str: string): T => (str ? JSON.parse(Buffer.from(str, "base64").toString("ascii")) : "");
