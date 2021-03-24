/**
 * Returns the full date in "202012130104"
 *
 * @returns {string}
 */
export const getFullDate = (): string =>
  (d =>
    [
      d.getFullYear(),
      d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
      d.getDate() < 10 ? `0${d.getDate()}` : d.getDate(),
      d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(),
      d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes(),
    ].join(""))(new Date());
