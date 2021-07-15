import { makeAutoObservable, autorun } from 'mobx';

import { EventInterface } from '../types';

import {
  getEventsFromLocalStorage,
  setEventsInLocalStorage,
} from '../helpers/localStorageHelper';

class EventStore {
  events: EventInterface[] = getEventsFromLocalStorage();
  selectedData: string = '';
  eventsDates: string[] = this.defineEventsDates(this.events);

  constructor() {
    makeAutoObservable(this);
    autorun(() => this.updateLocalStorageData(this.events));
  }

  //#region Actions
  updateLocalStorageData(newEventsList: EventInterface[]) {
    setEventsInLocalStorage(newEventsList);
  }

  setSelectedData(newSelectedData: string) {
    this.selectedData = newSelectedData;
  }

  addEvent(event: EventInterface) {
    this.events.push(event);

    this.updateEventsDates(this.events);
  }

  deleteEvent(id: string) {
    this.events = this.events.filter((event) => event.id !== id);

    this.updateEventsDates(this.events);
  }

  changeEvent(changedEvent: EventInterface) {
    const eventIndex = this.events.findIndex(
      (event) => event.id === changedEvent.id
    );
    const oldEvent = this.events[eventIndex];

    this.events[eventIndex] = { ...changedEvent };

    if (oldEvent.date !== changedEvent.date) {
      this.updateEventsDates(this.events);
    }
  }

  updateEventsDates(newEventsList: EventInterface[]) {
    this.eventsDates = this.defineEventsDates(newEventsList);
  }

  defineEventsDates(eventsList: EventInterface[]): string[] {
    const dates = new Set(eventsList.map((event) => event.date));

    return Array.from(dates.values()).sort((prev, next) =>
      prev.localeCompare(next)
    );
  }

  eventsByAnyDate(date: string): EventInterface[] {
    return this.events
      .filter((event) => event.date === date)
      .sort((prev, next) => prev.startTime.localeCompare(next.startTime));
  }

  defineIsTimeFree(
    date: string,
    startTime: string,
    endTime: string,
    id: string = ''
  ): boolean {
    const events = this.eventsByAnyDate(date);

    return !events.some((event: EventInterface) => {
      if (id === event.id) {
        return false;
      }

      return (
        (startTime >= event.startTime && startTime < event.endTime) ||
        (endTime > event.startTime && endTime <= event.endTime)
      );
    });
  }
  //#endregion

  //#region Computed values (derivations)
  get getEvents(): EventInterface[] {
    return this.events;
  }

  get getEventsDatesList(): string[] {
    return this.eventsDates;
  }

  get getSelectedData(): string {
    return this.selectedData;
  }
  //#endregion
}

const myEventStore = new EventStore();

export default myEventStore;
