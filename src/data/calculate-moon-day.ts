import * as suncalc from 'suncalc';
// @ts-ignore
import * as lune from 'lune';
import moment from 'moment';
import {filter, map, range, drop, head} from 'lodash';
import {startOfDay} from 'date-fns/startOfDay';
import {endOfDay} from 'date-fns/endOfDay';
import {intervalToDuration} from 'date-fns/intervalToDuration';
import {isBefore} from 'date-fns/isBefore';
import {isAfter} from 'date-fns/isAfter';
import {add} from 'date-fns/add';

const isDayBetween = (start: Date, day: Date, end?: Date) => {
  return isBefore(day, end || new Date()) && isAfter(day, start);
};

const daysRange = (startDate: Date, numberOfDays: number) => {
  return map(range(0, numberOfDays + 1), i =>
    add(startOfDay(startDate), {days: i}),
  );
};

const recentNewMoon = (date: Date): Date => {
  let endOfDate = endOfDay(date);
  let startOfDate = startOfDay(date);

  let recentPhases = lune.phase_hunt(endOfDate);

  if (recentPhases.new_date > endOfDate) {
    recentPhases = lune.phase_hunt(startOfDate);
  }

  return recentPhases.new_date;
};

const daysBetween = (start: Date, end: Date): number => {
  const {days} = intervalToDuration({
    end: endOfDay(end),
    start: startOfDay(start),
  });
  if (!days) {
    return 0;
  }
  return days;
};

const moonRises = (days: Date[], latitude: number, longitude: number) => {
  return days
    .map(day => suncalc.getMoonTimes(day, latitude, longitude).rise)
    .filter(rise => !!rise);
};

export const lunarDays = (date: Date, latitude: number, longitude: number) => {
  let newMoon = recentNewMoon(date);
  let diffDays = daysBetween(newMoon, date);
  let initDate = startOfDay(newMoon);

  // WE NEED CALCULATE CURRENT DAY + 2 for all moon days

  let days = daysRange(initDate, diffDays + 4);
  // check if first rist before new moon delete IT
  let rises = moonRises(days, latitude, longitude);
  if (moment(head(rises)).isSameOrBefore(newMoon)) {
    //rises.shift()
    rises = drop(rises);
  }
  let moonDays = [
    {
      number: 1,
      start: newMoon,
      end: head(rises),
    },
  ];

  for (let i = 0; i < rises.length - 1; i++) {
    moonDays.push({
      // +2 because we started from 2 day
      number: i + 2,
      start: rises[i],
      end: rises[i + 1],
    });
  }
  return filter(moonDays, ({start, end}) => isDayBetween(start, date, end));
};
