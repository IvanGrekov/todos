import React, { useState } from 'react';

import { FormComponent } from '../FormComponent';

import './AddEvent.scss';

export const AddEvent = () => {
  const [formStatus, setFormStatus] = useState(false);
  const [addingError, setAddingError] = useState(false);

  return (
    <div className="AddEventForm">
      {formStatus ? (
        <>
          <header className="AddEventForm__header">
            <h2 className="AddEventForm__title">Добавить событие</h2>

            <button
              className="AddEventForm__form-closer"
              title="Закрыть форму добавления события"
              onClick={() => {
                setFormStatus(false);
              }}
            />
          </header>

          {addingError && (
            <p className="AddEventForm__error">
              Ошибка добавления! Уже есть событие на указанное время
            </p>
          )}

          <FormComponent setAddingError={setAddingError} />
        </>
      ) : (
        <button
          className="AddEventForm__button"
          title="Открыть форму добавления события"
          onClick={() => {
            setFormStatus(true);
          }}
        >
          Добавить событие
        </button>
      )}
    </div>
  );
};
