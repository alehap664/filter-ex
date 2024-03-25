import { SelectorCallback, SelectorInstance } from './types';

const selector = <D = unknown, V = unknown>(cb: SelectorCallback<D, V>): SelectorInstance<D, V> => {
  return (condition) => {
    return (...value) => condition(cb(...value));
  };
};

export { selector };
