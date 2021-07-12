import { makeAutoObservable } from 'mobx';

import { EventInterface } from '../types';
import {
  getEventsFromLocalStorage,
  setEventsInLocalStorage,
} from '../helpers/localStorageHelper';
import { getValidDate } from '../helpers/dateHelper';
import { getEventsDates } from '../helpers/storeHelper';

export default class EventStore {
  events: EventInterface[] = getEventsFromLocalStorage();
  selectedData: string = getValidDate(new Date());
  eventsDates: string[] = getEventsDates(this.events);

  constructor() {
    makeAutoObservable(this);
  }

  //#region Actions
  setSelectedData(newSelectedData: string) {
    this.selectedData = newSelectedData;
  }

  addEvent(event: EventInterface) {
    this.events.push(event);

    this.updateDatesAndLocalStorage(this.events);
  }

  deleteEvent(id: string) {
    this.events = this.events.filter((event) => event.id !== id);

    this.updateDatesAndLocalStorage(this.events);
  }

  changeEvent(changedEvent: EventInterface) {
    const eventIndex = this.events.findIndex(
      (event) => event.id === changedEvent.id
    );
    const oldEvent = this.events[eventIndex];

    this.events[eventIndex] = { ...changedEvent };

    if (oldEvent.date !== changedEvent.date) {
      this.updateDatesAndLocalStorage(this.events);
    }

    this.updateLocalStorageData(this.events);
  }

  updateDatesAndLocalStorage(newEventsList: EventInterface[]) {
    this.updateEventsDates(newEventsList);
    this.updateLocalStorageData(newEventsList);
  }

  updateEventsDates(newEventsList: EventInterface[]) {
    this.eventsDates = getEventsDates(newEventsList);
  }

  updateLocalStorageData(newEventsList: EventInterface[]) {
    setEventsInLocalStorage(newEventsList);
  }
  //#endregion

  //#region Computed values (derivations)
  get eventsBySelectedData(): EventInterface[] {
    return this.events.filter((event) => event.date === this.selectedData);
  }

  get eventsDatesList(): string[] {
    return this.eventsDates;
  }
  //#endregion
}
