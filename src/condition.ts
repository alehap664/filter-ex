import { SelectorInstance, Predicate } from "."

const condition = <D, V,>(selector: SelectorInstance<D, V>) => {
  function func(condition: (value: V) => (target: V) => boolean): (value: V) => Predicate<D>
  function func(condition: (value1: V, value2: V) => (target: V) => boolean): (value1: V, value2: V) => Predicate<D>
  function func(condition: any) {
    return (...v: any) => selector((condition(...v)))
  }
  return func
}

export { condition };
