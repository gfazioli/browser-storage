/**
 * Removes http or https from a URL
 *
 * @param str Source string
 */
export const stripProtocol = (str: string): string => str.replace(/(http[s]?:\/\/)/g, "");
