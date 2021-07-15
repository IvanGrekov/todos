import React, { useCallback, useState } from 'react';

import { ButtonHandler } from '../ButtonHandler';
import { FormComponent } from '../FormComponent';

import './AddEvent.scss';

export const AddEvent = () => {
  const [formStatus, setFormStatus] = useState(false);
  const [addingError, setAddingError] = useState(false);
  const [addingSuccess, setAddingSuccess] = useState(false);

  const handleFormStatus = useCallback(() => {
    setFormStatus(false);
  }, []);

  return (
    <div className="AddEventForm">
      {formStatus ? (
        <>
          <header className="AddEventForm__header">
            <h2 className="AddEventForm__title">Добавить событие</h2>

            <ButtonHandler
              handler={handleFormStatus}
              title={'Закрыть форму добавления события'}
              buttonClose={true}
            />
          </header>

          {addingError && (
            <p className="AddEventForm__notification">
              Ошибка добавления! Уже есть событие на указанное время!
            </p>
          )}

          {addingSuccess && (
            <p className="AddEventForm__notification AddEventForm__notification--success">
              Событие успешно добавлено!
            </p>
          )}

          <FormComponent
            setAddingError={setAddingError}
            setAddingSuccess={setAddingSuccess}
          />
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
