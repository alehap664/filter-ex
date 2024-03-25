import { describe, expect, test } from 'vitest';

import { fx, Selector } from '..';
import students from './mocks/students.json';
import { Student } from './types';

const countAwardsInYears = (years: number[], awards: Student['awards']) => {
  const counterMap: Record<number, number> = {};
  const inYear = fx.in(years);

  for (const award of awards) {
    if (inYear(award.year)) {
      const count = counterMap[award.year] ?? 0;
      counterMap[award.year] = count + award.count;
    }
  }

  return (year: number) => counterMap[year];
};
const countAwards = (awards: Student['awards']) => {
  let counter = 0;
  for (const award of awards) counter += award.count;
  return counter;
};

const studentFx = fx.createFilter({
  selectors: (selector: Selector<Student>) => ({
    age: selector((student) => student.age),
    gpa: selector((student) => student.gpa),
    sports: selector((student) => student.sports),
    sportsLength: selector((student) => student.sports.length),
    awards: selector((student) => student.awards)
  }),
  filters: (s) => ({
    ageBetween: fx.condition(s.age)(fx.bw),
    gpaBetween: fx.condition(s.gpa)(fx.bw),
    gpaGreaterThanEqual: fx.condition(s.gpa)(fx.gte),
    gpaLessThan: fx.condition(s.gpa)(fx.lt),
    plays: fx.condition(s.sports)(fx.in),
    sportsAtLeast: fx.condition(s.sportsLength)(fx.gte),
    awardsGreaterThanEqual: (count: number) => {
      return s.awards((awards) => {
        const counter = countAwards(awards);
        return fx.gte(count)(counter);
      });
    },
    atLeastAwardsInYears: (count: number) => (years: number[]) => {
      return s.awards((awards) => {
        const counter = countAwardsInYears(years, awards);
        const selector = fx.selector(counter);
        return years.every(selector(fx.gte(count)));
      });
    },
    atLeastAwardsInSomeYears: (count: number) => (years: number[]) => {
      return s.awards((awards) => {
        const counter = countAwardsInYears(years, awards);
        const selector = fx.selector(counter);
        return years.some(selector(fx.gte(count)));
      });
    }
  })
});

describe('Filter students:', () => {
  test('Students GPA >= 3.0', () => {
    const { gpaGreaterThanEqual } = studentFx;
    const condition = 3.0;

    const toMatch = students.filter((value) => value.gpa >= condition);
    const target = students.filter(gpaGreaterThanEqual(condition));

    expect(target).toEqual(toMatch);
  });

  test('Students plays soccer or basketball', () => {
    const { plays } = studentFx;
    const sports = ['soccer', 'basketball'];

    const toMatch = students.filter((value) => {
      return value.sports.some((value) => sports.includes(value));
    });
    const target = students.filter(plays(sports));

    expect(target).toEqual(toMatch);
  });

  test('Students play at least 2 sports', () => {
    const { sportsAtLeast } = studentFx;

    const toMatch = students.filter((value) => {
      return value.sports.length >= 2;
    });
    const target = students.filter(sportsAtLeast(2));

    expect(target).toEqual(toMatch);
  });

  test('Students have at least 2 awards in all years: 2022, 2023, 2024', () => {
    const years = [2022, 2023, 2024];

    const { atLeastAwardsInYears } = studentFx;

    const toMatch = students.filter((student) => {
      const { awards } = student;
      const counter = countAwardsInYears(years, awards);

      return years.every((year) => counter(year) >= 2);
    });

    const target = students.filter(atLeastAwardsInYears(2)(years));

    expect(target).toEqual(toMatch);
  });

  test('Students have at least 2 awards in some years: 2022, 2023, 2024', () => {
    const years = [2022, 2023, 2024];

    const { atLeastAwardsInSomeYears } = studentFx;

    const toMatch = students.filter((student) => {
      const { awards } = student;
      const counter = countAwardsInYears(years, awards);

      return years.some((year) => counter(year) >= 2);
    });

    const target = students.filter(atLeastAwardsInSomeYears(2)(years));

    expect(target).toEqual(toMatch);
  });
});

describe('Filter students advanced:', () => {
  test(`Student GPA between 2.5 and 3.0 or
       GPA less than 2.5 and have awards
  `, () => {
    const { gpaBetween, gpaLessThan, awardsGreaterThanEqual } = studentFx;

    const toMatch = students.filter((student) => {
      const { gpa, awards } = student;
      return (gpa >= 2.5 && gpa <= 3.0) || (gpa < 2.5 && awards.length >= 1);
    });

    const target = students.filter(
      fx.or(
        gpaBetween(2.5, 3.0),
        fx.and(gpaLessThan(2.5), awardsGreaterThanEqual(1))
      )
    );

    expect(target).toEqual(toMatch);
  });
  test(`Student GPA between 2.5 and 3.0 or
       GPA between 2.0 and 2.5 and have awards or
       GPA less than 2.0 and 
         have at least 2 awards in 2024 or
         have at least 5 awards in all years and age between 18 and 24
  `, () => {
    const toMatch = students.filter((student) => {
      const { age, gpa, awards } = student;
      const counter1 = countAwardsInYears([2024], awards)(2024);
      const counter2 = countAwards(awards);

      const isGPABetweenTwoDotFiveAndThree = gpa >= 2.5 && gpa <= 3.0;
      const isGPABetweenTwoAndTwoDotFive = gpa >= 2 && gpa <= 2.5;
      const isGPALessThanTwo = gpa < 2;
      const isHaveAwards = awards.length >= 1;
      const isAtLeastTwoAwardsIn2024 = counter1 >= 2;
      const isGreaterThanEqualFiveAwards = counter2 >= 5;
      const isAgeBetweenEightTeenAndTwentyFour = age >= 18 && age <= 20;
      return (
        isGPABetweenTwoDotFiveAndThree ||
        (isGPABetweenTwoAndTwoDotFive && isHaveAwards) ||
        (isGPALessThanTwo &&
          (isAtLeastTwoAwardsIn2024 ||
            (isGreaterThanEqualFiveAwards &&
              isAgeBetweenEightTeenAndTwentyFour)))
      );
    });

    const isGPABetweenTwoDotFiveAndThree = studentFx.gpaBetween(2.5, 3.0);
    const isGPABetweenTwoAndTwoDotFive = studentFx.gpaBetween(2, 2.5);
    const isGPALessThanTwo = studentFx.gpaLessThan(2.0);
    const isHaveAwards = studentFx.awardsGreaterThanEqual(1);
    const isAtLeastTwoAwardsIn2024 = studentFx.atLeastAwardsInYears(2)([2024]);
    const isGreaterThanEqualFiveAwards = studentFx.awardsGreaterThanEqual(5);
    const isAgeBetweenEightTeenAndTwentyFour = studentFx.ageBetween(18, 20);

    const filter = fx.or(
      isGPABetweenTwoDotFiveAndThree,
      fx.and(isGPABetweenTwoAndTwoDotFive, isHaveAwards),
      fx.and(
        isGPALessThanTwo,
        fx.or(
          isAtLeastTwoAwardsIn2024,
          fx.and(
            isGreaterThanEqualFiveAwards,
            isAgeBetweenEightTeenAndTwentyFour
          )
        )
      )
    );

    const target = students.filter(filter);

    expect(target).toEqual(toMatch);
  });
});
