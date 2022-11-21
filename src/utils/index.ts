

import { formatDuration, intervalToDuration } from 'date-fns'

export const  humanizeFutureToNow = (fDate: string) => {
  let duration = intervalToDuration({
      start: new Date(), 
      end: new Date(fDate),
  })
  
  return formatDuration(duration, {
      delimiter: ', '
  });
};

export * from './axios';
export * from  './jwt';
