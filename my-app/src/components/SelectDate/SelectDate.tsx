import React from 'react';
import { observer } from 'mobx-react';

import myEventStore from '../../store';

import './SelectDate.scss';

export const SelectDate = observer(() => {
  return (
    <div className="SelectDate">
      <label htmlFor="select-date" className="SelectDate__label">
        <h2 className="SelectDate__label-text">Показать события по дате:</h2>

        <select
          id="select-date"
          className="SelectDate__select"
          name="select-date"
          value={myEventStore.getSelectedData}
          onChange={(event) => {
            myEventStore.setSelectedData(event.target.value);
          }}
        >
          <option value="" disabled>
            Выберите дату
          </option>

          {myEventStore.getEventsDatesList.map((eventDate: string) => (
            <option value={eventDate} key={eventDate}>
              {eventDate}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
});
