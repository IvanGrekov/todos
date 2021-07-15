import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

import { HandlerButton } from '../HandlerButton';
import { Notification } from '../Notification';
import { ItemAddingForm } from '../ItemAddingForm';
import { Button } from '../Button';

import './AddEvent.scss';

const handlerTitle = 'Закрыть форму добавления события';
const errorMessage = 'Ошибка добавления! Уже есть событие на указанное время!';
const successMessage = 'Событие успешно добавлено!';
const buttonText = 'Добавить событие';
const buttonTitle = 'Открыть форму добавления события';

export const AddEvent = () => {
  const [formStatus, setFormStatus] = useState(false);
  const [addingError, setAddingError] = useState(false);
  const [addingSuccess, setAddingSuccess] = useState(false);

  const handleFormStatus = useCallback(() => {
    setFormStatus((prevState) => !prevState);
    setAddingError(false);
    setAddingSuccess(false);
  }, []);

  return (
    <div className="AddEvent">
      {formStatus ? (
        <>
          <header className="AddEvent__header">
            <h2 className="AddEvent__title">Добавить событие</h2>

            <HandlerButton
              handler={handleFormStatus}
              title={handlerTitle}
              buttonClose={true}
            />
          </header>

          <div
            className={classNames('AddEvent__notification-wrapper', {
              'AddEvent__notification-wrapper--active':
                addingError || addingSuccess,
            })}
          >
            {addingError && (
              <Notification text={errorMessage} errorStatus={true} />
            )}

            {addingSuccess && (
              <Notification text={successMessage} successStatus={true} />
            )}
          </div>

          <ItemAddingForm
            setAddingError={setAddingError}
            setAddingSuccess={setAddingSuccess}
          />
        </>
      ) : (
        <div className="AddEvent__button-wrapper">
          <Button
            handler={handleFormStatus}
            text={buttonText}
            title={buttonTitle}
          />
        </div>
      )}
    </div>
  );
};
