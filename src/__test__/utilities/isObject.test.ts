/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from 'vitest';

import { isObject } from '../../utilities';

describe('Utility isObject', () => {
  test('Value is string', () => {
    const target = isObject('');
    expect(target).toBeFalsy();
  });
  test('Value is number', () => {
    const target = isObject(0);
    expect(target).toBeFalsy();
  });
  test('Value is boolean', () => {
    const target = isObject(false);
    expect(target).toBeFalsy();
  });
  test('Value is undefined', () => {
    const target = isObject(undefined);
    expect(target).toBeFalsy();
  });
  test('Value is NaN', () => {
    const target = isObject(NaN);
    expect(target).toBeFalsy();
  });
  test('Value is function', () => {
    const fn = () => undefined;
    const target = isObject(fn);
    expect(target).toBeFalsy();
  });
  test('Value is array', () => {
    const target = isObject([]);
    expect(target).toBeFalsy();
  });
  test('Value is object', () => {
    const target = isObject({});
    expect(target).toBeTruthy();
  });
});
