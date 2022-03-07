import * as suncalc from 'suncalc';
// @ts-ignore
import * as lune from 'lune';
import moment from 'moment';
import {filter, map, range, drop, chain, head} from 'lodash';
import {Moment} from 'moment/moment';
import {Platform, StyleSheet} from 'react-native';
import {getLocation} from './get-geolocation';

const isDayBetween = (start: Moment, end: Moment, day: Moment) => {
  return (
    moment(day).startOf('day').isBetween(moment(start), moment(end)) ||
    moment(day).endOf('day').isBetween(moment(start), moment(end))
  );
};

const daysRange = (startDate: Moment, numberOfDays: number) => {
  return map(range(0, numberOfDays + 1), i =>
    moment(moment(startDate).startOf('day').add(i, 'days')),
  );
};

const recentNewMoon = (date: Moment) => {
  let endOfDate = moment(date).endOf('day').toDate();
  let startOfDate = moment(date).startOf('day').toDate();

  let recentPhases = lune.phase_hunt(endOfDate);

  if (recentPhases.new_date > endOfDate) {
    recentPhases = lune.phase_hunt(startOfDate);
  }

  return moment(recentPhases.new_date);
};

const daysBetween = (start: Moment, end: Moment) => {
  return moment(end).endOf('day').diff(moment(start).startOf('day'), 'days');
};

const moonRises = (days: Moment[], latitude: number, longitude: number) => {
  return chain(days)
    .map(
      day =>
        suncalc.getMoonTimes(moment(day).toDate(), latitude, longitude).rise,
    )
    .filter(rise => !!rise)
    .map(rise => moment(rise))
    .value();
};

export const lunarDays = (
  date: Moment,
  latitude: number,
  longitude: number,
) => {
  let newMoon = recentNewMoon(date);
  let diffDays = daysBetween(newMoon, date);
  let initDate = moment(newMoon).startOf('day');

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
  return filter(moonDays, ({start, end}) =>
    isDayBetween(start, end || moment(), date),
  );
};
