/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from 'vitest';

import fx from '..';

describe('Create filter', () => {
  test('Not have params', () => {
    const filterFx = (fx.createFilter as any)();
    expect(filterFx).toStrictEqual({});
  });
  test('Selectors is missing ', () => {
    const filterFx = (fx.createFilter as any)({ filters: () => undefined });
    expect(filterFx).toStrictEqual({});
  });
  test('Selectors is not a function', () => {
    const createFilter: any = fx.createFilter;

    const selectorUndefined = createFilter({
      selectors: undefined,
      filters: () => ({})
    });
    expect(selectorUndefined).toStrictEqual({});

    const selectorNull = createFilter({
      selectors: null,
      filters: () => ({})
    });
    expect(selectorNull).toStrictEqual({});

    const selectorString = createFilter({
      selectors: null,
      filters: () => ({})
    });
    expect(selectorString).toStrictEqual({});

    const selectorNumber = createFilter({
      selectors: 1111,
      filters: () => ({})
    });
    expect(selectorNumber).toStrictEqual({});

    const selectorBoolean = createFilter({
      selectors: true,
      filters: () => ({})
    });
    expect(selectorBoolean).toStrictEqual({});

    const selectorNaN = createFilter({
      selectors: NaN,
      filters: () => ({})
    });
    expect(selectorNaN).toStrictEqual({});

    const selectorFunc = createFilter({
      selectors: () => () => undefined,
      filters: () => ({})
    });
    expect(selectorFunc).toStrictEqual({});

    const selectorArray = createFilter({
      selectors: [],
      filters: () => ({})
    });
    expect(selectorArray).toStrictEqual({});

    const selectorObject = createFilter({
      selectors: {},
      filters: () => ({})
    });
    expect(selectorObject).toStrictEqual({});
  });
  test('Filters is missing ', () => {
    const filterFx = (fx.createFilter as any)({
      selectors: () => ({ undefined })
    });
    expect(filterFx).toStrictEqual({});
  });
  test('Filters return value', () => {
    const filterUndefined = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => undefined
    });
    expect(filterUndefined).toStrictEqual({});

    const filterNull = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => null
    });
    expect(filterNull).toStrictEqual({});

    const filterString = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => null
    });
    expect(filterString).toStrictEqual({});

    const filterNumber = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => 1111
    });
    expect(filterNumber).toStrictEqual({});

    const filterBoolean = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => true
    });
    expect(filterBoolean).toStrictEqual({});

    const filterNaN = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => NaN
    });
    expect(filterNaN).toStrictEqual({});

    const filterFunc = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => () => undefined
    });
    expect(filterFunc).toStrictEqual({});

    const filterArray = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => []
    });
    expect(filterArray).toStrictEqual({});

    const filterObject = fx.createFilter({
      selectors: () => ({ undefined }),
      filters: () => ({ undefined })
    });
    expect(filterObject).toStrictEqual({ undefined });
  });
  test('Filters is not a function', () => {
    const createFilter: any = fx.createFilter;

    const filterUndefined = createFilter({
      selectors: () => ({ undefined }),
      filters: undefined
    });
    expect(filterUndefined).toStrictEqual({});

    const filterNull = createFilter({
      selectors: () => ({ undefined }),
      filters: null
    });
    expect(filterNull).toStrictEqual({});

    const filterString = createFilter({
      selectors: () => ({ undefined }),
      filters: null
    });
    expect(filterString).toStrictEqual({});

    const filterNumber = createFilter({
      selectors: () => ({ undefined }),
      filters: 1111
    });
    expect(filterNumber).toStrictEqual({});

    const filterBoolean = createFilter({
      selectors: () => ({ undefined }),
      filters: true
    });
    expect(filterBoolean).toStrictEqual({});

    const filterNaN = createFilter({
      selectors: () => ({ undefined }),
      filters: NaN
    });
    expect(filterNaN).toStrictEqual({});

    const filterFunc = createFilter({
      selectors: () => ({ undefined }),
      filters: () => () => undefined
    });
    expect(filterFunc).toStrictEqual({});

    const filterArray = createFilter({
      selectors: () => ({ undefined }),
      filters: []
    });
    expect(filterArray).toStrictEqual({});

    const filterObject = createFilter({
      selectors: () => ({ undefined }),
      filters: { undefined }
    });
    expect(filterObject).toStrictEqual({});
  });
});
