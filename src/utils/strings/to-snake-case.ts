/**
 * Replaces any space with underscore and lower case the whole input string
 *
 * @param str Input string
 */
export const toSnakeCase = (str: string): string => str.split(" ").join("_").toLowerCase();
