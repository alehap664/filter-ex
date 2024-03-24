import { Predicate } from "..";

const compareAsJSON = (v1: any, v2: any) => {
  return JSON.stringify(v1) === JSON.stringify(v2)
}

const and = <D>(...predicates: (Predicate<D> | Predicate<D>[])[]): Predicate<D> => {
  return (...data) => predicates.every((predicate) => {
    if (Array.isArray(predicate)) return predicate.every((predicate) => predicate(...data));
    return predicate(...data);
  });
}
const or = <D>(...predicates: (Predicate<D> | Predicate<D>[])[]): Predicate<D> => {
  return (...data) => predicates.some((predicate) => {
    if (Array.isArray(predicate)) return predicate.some((predicate) => predicate(...data));
    return predicate(...data);
  });
}

const predicate = <D>(predicate: Predicate<D>): Predicate<D> => {
  return (...data: Parameters<Predicate<D>>) => predicate(...data);
}

export { compareAsJSON, and, or, predicate };
