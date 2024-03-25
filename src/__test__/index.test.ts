import { describe, expect, test } from 'vitest';

import { fx, Selector } from '..';
import students from './mocks/students.json';
import { Student } from './types';

const studentFx = fx.createFilter({
  selectors: (selector: Selector<Student>) => ({
    gpa: selector((value) => value.gpa),
    sports: selector((value) => value.sports)
  }),
  filters: (s) => ({
    gpaGreaterThanEqualThree: s.gpa(fx.gte(3.0)),
    plays: fx.condition(s.sports)(fx.in)
  })
});

describe('Filter students:', () => {
  test('Students GPA >= 3.0', () => {
    const { gpaGreaterThanEqualThree } = studentFx;
    const toMatch = students.filter((value) => value.gpa >= 3.0);

    expect(students.filter(gpaGreaterThanEqualThree)).toEqual(toMatch);
  });

  test('Students plays soccer or basketball', () => {
    const { plays } = studentFx;
    const sports = ['soccer', 'basketball'];

    const toMatch = students.filter((value) => {
      return value.sports.some((value) => {
        return sports.includes(value);
      });
    });

    expect(students.filter(plays(sports))).toEqual(toMatch);
  });
});
