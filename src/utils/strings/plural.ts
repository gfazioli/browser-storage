/**
 * Return the right string for plural/singolar
 *
 * @param {number} value - The value to check.
 * @param {string} plural - Optional. Default "s". The string returned when value > 1.
 * @param {string} singular - Optional. Default blank. The string returned when value === 1.
 * @param {string} singular - Optional. Default blank. The string returned when value === 0.
 *
 * @return {string}
 *
 * @example
 *
 * ```js
 * // plural, singular and zero
 * return plural(value, `You have got ${value} computers`, `You have got only ${value} computer`, `Sorry, you have not got any computer`);
 *
 * // Of course, you may use also
 * return `There ${plural(people, "are", "is")} ${people} ${plural(people, "people", "person")}`;
 * // There are 4 people
 * // There is 1 person
 *
 * // or
 * return `${files} file${plural(files)}`;
 * // 1 file
 * // 4 files
 * ```
 */
export const plural = (value: number | string, plural = "s", singular = "", zero = ""): string => {
  const v = typeof value === "string" ? parseInt(value) : value;
  return v > 1 ? plural : v === 0 ? zero : singular;
};
