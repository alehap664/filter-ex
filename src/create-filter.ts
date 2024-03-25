import { isFunction, isObject, predicate } from '.';
import { selector } from './selector';
import { FilterParams } from './types';

const createFilter = <D, T, F>(params: FilterParams<D, T, F>): F => {
  if (!isObject(params)) return {} as F;
  const { selectors, filters } = params;

  if (!isFunction(selectors) || !isFunction(filters)) return {} as F;

  const selectorInstance = selectors(selector);
  if (!isObject(selectorInstance)) return {} as F;

  const filterInstance = filters(selectors(selector), predicate);
  if (!isObject(filterInstance)) return {} as F;

  return filterInstance;
};

export { createFilter };
