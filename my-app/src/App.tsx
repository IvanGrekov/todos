import React from 'react';

import { observer } from 'mobx-react';
import EventStore from './store';

import './App.css';

const myEventStore = new EventStore();

export const App = () => {
  return <div className="App"></div>;
};
