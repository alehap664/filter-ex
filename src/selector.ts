import { SelectorCallback, SelectorInstance } from "./types";

const selector = <D = any, V = any>(cb: SelectorCallback<D, V>): SelectorInstance<D, V> => {
  return (condition) => (...value) => condition(cb(...value))
}

export { selector };
