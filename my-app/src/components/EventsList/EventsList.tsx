import React from 'react';
import { observer } from 'mobx-react';

import myEventStore from '../../store';
import { EventInterface } from '../../types';
import { EventItem } from '../EventItem';

import './EventsList.scss';

export const EventsList = observer(() => {
  return (
    <ul className="EventsList">
      {myEventStore
        .eventsByAnyDate(myEventStore.getSelectedData)
        .map((event: EventInterface) => (
          <li className="EventsList__list-item" key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
    </ul>
  );
});
