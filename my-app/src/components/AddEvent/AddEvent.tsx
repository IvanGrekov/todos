import React, { useState } from 'react';

import { FormComponent } from '../FormComponent';

import './AddEvent.scss';

export const AddEvent = () => {
  const [addingError, setAddingError] = useState(false);

  return (
    <div className="AddEventForm">
      <h2 className="AddEventForm__title">Добавить мероприятие</h2>
      {addingError && (
        <p className="AddEventForm__error">
          Ошибка добавления! Уже есть событие на указанное время
        </p>
      )}

      <FormComponent setAddingError={setAddingError} />
    </div>
  );
};
