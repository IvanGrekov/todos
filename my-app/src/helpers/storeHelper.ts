import { EventInterface } from '../types';

export const getEventsDates = (eventsList: EventInterface[]): string[] => {
  const dates = new Set(eventsList.map((event) => event.date));

  return Array.from(dates.values());
};
