export type Func<V = any> = (value: V) => boolean;
export type Predicate<V = any> = (value: V, index: number, array: V[]) => boolean;

export type SelectorCallback<D = any, V = any> = (value: D, index: number, array: D[]) => V;
export type SelectorInstance<D = any, V = any> = (func: Func<V>) => Predicate<D>;
export type Selector<D = any> = <V = any>(cb: SelectorCallback<D, V>) => SelectorInstance<D, V>;

export type FilterParams<D = any, S = any, F = any> = {
  selectors: (selector: Selector<D>) => S;
  /**
   * @param selectors
   * @param predicate A function that accepts predicate callback function up to three arguments. The filter method calls the predicate function one time for each element in the array.
   */
  filters?: (selectors: S, predicate: (predicate: Predicate<D>) => Predicate<D>) => F;
};
