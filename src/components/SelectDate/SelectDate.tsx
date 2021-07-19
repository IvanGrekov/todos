import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import myEventStore from '../../store';

import './SelectDate.scss';

export const SelectDate = observer(() => {
  const setSelectedData = useCallback((event) => {
    const value = event.target.value;

    myEventStore.setSelectedData(value);
    myEventStore.updateEventsDates(myEventStore.events);
  }, []);

  return (
    <div className="SelectDate">
      <label htmlFor="select-date" className="SelectDate__label">
        <h2 className="SelectDate__label-text">Показать события по дате:</h2>

        <select
          id="select-date"
          className="SelectDate__select"
          name="select-date"
          value={myEventStore.getSelectedData}
          onChange={setSelectedData}
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
