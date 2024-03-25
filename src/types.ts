export type Func<V = unknown> = (value: V) => boolean;
export type Predicate<V = unknown> = (value: V, index: number, array: V[]) => boolean;

export type SelectorCallback<D = unknown, V = unknown> = (value: D, index: number, array: D[]) => V;
export type SelectorInstance<D = unknown, V = unknown> = (func: Func<V>) => Predicate<D>;
export type Selector<D = unknown> = <V = unknown>(cb: SelectorCallback<D, V>) => SelectorInstance<D, V>;

export type FilterParams<D = unknown, S = unknown, F = unknown> = {
  selectors: (selector: Selector<D>) => S;
  /**
   * @param selectors
   * @param predicate A function that accepts predicate callback function up to three arguments. The filter method calls the predicate function one time for each element in the array.
   */
  filters?: (selectors: S, predicate: (predicate: Predicate<D>) => Predicate<D>) => F;
};
