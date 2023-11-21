/**
 * Lodash `_.omit` alternative. This method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @param object The source object.
 * @param keys The property names to omit, specified in array.
 * @returns Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * omit(object, ['a']);
 * // => { 'b': '2', 'c': 3 }
 */
export const omit = <T extends object, K extends keyof T>(
  object: T,
  keys: K[]
): Omit<T, K> =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
