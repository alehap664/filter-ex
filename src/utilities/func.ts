import { compareAsJSON } from '.';

/**
 * Equal
 */
const eq = <T = number | string>(value: T) => {
  return (target: T) => value === target;
};
/**
 * Between
 */
const bw = (from: number, to: number) => (target: number) => target >= from && target <= to;
/**
 * Greater than
 */
const gt = (value: number) => (target: number) => target > value;
/**
 * Greater than or equal to
 */
const gte = (value: number) => (target: number) => target >= value;
/**
 * Less than
 */
const lt = (value: number) => (target: number) => target < value;
/**
 * Less than or equal to
 */
const lte = (value: number) => (target: number) => target <= value;
/**
 * Like
 */
const like = (value: string) => (target: string) => target.toLowerCase().includes(value.toLowerCase());
/**
 * Value equals any value in the specified array.
 */
const includes = <T>(values: Array<T>) => {
  return (target: Array<T> | T) => {
    if (Array.isArray(target)) {
      for (const v1 of values) {
        for (const v2 of target) if (compareAsJSON(v1, v2)) return true;
      }
      return false;
    }

    for (const v of values) if (compareAsJSON(v, target)) return true;
    return false;
  };
};
/**
 * Value is not in the specified array.
 */
const nin = <T>(values: Array<T>) => {
  return (target: Array<T> | T) => {
    if (Array.isArray(target)) {
      for (const v1 of values) {
        for (const v2 of target) if (compareAsJSON(v1, v2)) return false;
      }
    }

    for (const v of values) if (compareAsJSON(v, target)) return false;
    return true;
  };
};

export { bw, eq, gt, gte, includes as in, like, lt, lte, nin };
