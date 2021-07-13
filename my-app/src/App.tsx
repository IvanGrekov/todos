import React from 'react';

import { AddEvent } from './components/AddEventForm';

import { observer } from 'mobx-react';
import EventStore from './store';

import './App.scss';

const myEventStore = new EventStore();

export const App = () => {
  return (
    <div className="App">
      <AddEvent />
    </div>
  );
};
