import React from 'react';

import { AddEvent } from './components/AddEvent';
import { EventsList } from './components/EventsList';
import { SelectDate } from './components/SelectDate';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">Events</h1>
      </header>

      <main className="App__main">
        <section className="App__add-event-wrapper">
          <AddEvent />
        </section>

        <section className="App__events-list-wrapper">
          <div className="App__select-date-wrapper">
            <SelectDate />
          </div>

          <EventsList />
        </section>
      </main>
    </div>
  );
};

export default App;
