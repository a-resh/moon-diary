import {Moment} from 'moment/moment';

export const moonDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
] as const;

export type City = {
  n: string;
  l: number[];
  c: string;
  p: number;
};

export type MoonDays = typeof moonDays[number];

export type MoonDayData = {
  start: Moment;
  end: Moment | undefined;
  number: number;
};
export const sectionTypes = [
  'description',
  'health',
  'business',
  // 'esoterics',
  'dreams',
  'sex',
  'wedding',
] as const;
export type SectionTypes = typeof sectionTypes[number];
