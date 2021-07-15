import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react';

import { EventInterface } from '../../types';
import myEventStore from '../../store';
import { ItemEditing } from '../ItemEditing';
import { HandlerButton } from '../HandlerButton';

import { makeCapitalFirstLetter } from '../../helpers/EventItemHelper';
import {
  getHtmlDateFormat,
  getDayForDisplay,
  getMonthForDisplay,
  getYearForDisplay,
} from '../../helpers/dateHelper';

import './EventItem.scss';

const handlerEditingTitle = 'Изменить событие';
const handlerItemDeletingTitle = 'Удалить событие';

export const EventItem = observer(({ event }: { event: EventInterface }) => {
  const [editingStatus, setStatusEditing] = useState(false);

  const { title, date, startTime, endTime, id } = event;

  const handleStatusEditing = useCallback(() => {
    setStatusEditing((prevState) => !prevState);
  }, [setStatusEditing]);

  const onDeleteEvent = useCallback(() => {
    myEventStore.deleteEvent(id);
  }, [id]);

  return (
    <div className="EventItem">
      <time className="EventItem__date" dateTime={getHtmlDateFormat(date)}>
        <span className="EventItem__date-item">{getDayForDisplay(date)}</span>
        <span className="EventItem__date-item">{getMonthForDisplay(date)}</span>
        <span className="EventItem__date-item">{getYearForDisplay(date)}</span>
      </time>

      <div className="EventItem__details-wrapper">
        <div className="EventItem__details">
          <h3 className="EventItem__title">
            <span>{makeCapitalFirstLetter(title)}</span>

            <HandlerButton
              handler={handleStatusEditing}
              title={handlerEditingTitle}
              whiteBackground={true}
              buttonEdit={true}
            />
          </h3>

          <div className="EventItem__additional-details-wrapper">
            <div className="EventItem__clock-icon" />

            <div className="EventItem__time-wrapper">
              <time
                className="EventItem__time EventItem__time--start"
                dateTime={startTime}
              >
                {`${startTime} - `}
              </time>

              <time
                className="EventItem__time EventItem__time--end"
                dateTime={endTime}
              >
                {endTime}
              </time>
            </div>
          </div>

          {editingStatus && (
            <div className="EventItem__editing-form">
              <ItemEditing
                event={event}
                handleStatusEditing={handleStatusEditing}
              />
            </div>
          )}
        </div>

        <HandlerButton
          handler={onDeleteEvent}
          title={handlerItemDeletingTitle}
          whiteBackground={true}
          buttonClose={true}
        />
      </div>
    </div>
  );
});
