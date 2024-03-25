import { predicate } from '.';
import { selector } from './selector';
import { FilterParams } from './types';

const createFilter = <D, T, F>(params: FilterParams<D, T, F>): T & F => {
  const { selectors, filters } = params;
  const instance = selectors(selector) as T & F;

  if (!filters) return instance;
  return { ...instance, ...filters(instance, predicate) };
};

export { createFilter };
