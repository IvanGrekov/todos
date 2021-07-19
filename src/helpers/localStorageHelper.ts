import { EventInterface } from '../types';

export const getEventsFromLocalStorage = (): EventInterface[] => {
  const events = localStorage.getItem('events') || '[]';

  return JSON.parse(events);
};

export const setEventsInLocalStorage = (eventsList: EventInterface[]) => {
  const validData = JSON.stringify(eventsList);

  localStorage.setItem('events', validData);
};
