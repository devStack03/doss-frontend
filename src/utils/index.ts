

import { format, formatDuration, intervalToDuration } from 'date-fns'
import { addHours, getMinutes, getHours, getSeconds } from 'date-fns';

export const convertToDuration = (secondsAmount: number) => {
    const normalizeTime = (time: string): string =>
    time.length === 1 ? `0${time}` : time;

    const SECONDS_TO_MILLISECONDS_COEFF = 1000;
    const MINUTES_IN_HOUR = 60;

    const milliseconds = secondsAmount * SECONDS_TO_MILLISECONDS_COEFF;

    const date = new Date(milliseconds);
    const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR;
    const dateWithoutTimezoneDiff = addHours(date, timezoneDiff);

    const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)));
    const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)));
    const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)));

    const hoursOutput = hours !== '00' ? `${hours}:` : '';

    return `${hoursOutput}${minutes}:${seconds}`;
};

export const  humanizeFutureToNow = (fDate: string) => {
  let duration = intervalToDuration({
      start: new Date(), 
      end: new Date(fDate),
  })
  
  return formatDuration(duration, {
      delimiter: ', '
  });
};

export const formatDate = (fDate: string) => {
  return format(new Date(fDate), 'dd:MM:yyyy HH:MM');
}

export * from './axios';
export * from  './jwt';
