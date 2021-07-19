import React, {
  useCallback,
  useMemo,
  useState,
  MouseEventHandler,
} from 'react';
import { observer } from 'mobx-react';
import { Formik } from 'formik';

import { EventInterface, FormValues } from '../../types';
import myEventStore from '../../store';
import { ItemEditingForm } from '../ItemEditiingForm';

import { validateEditingItemForm } from '../../helpers/FormHelper';
import {
  getValidDateFormat,
  getHtmlDateFormat,
} from '../../helpers/dateHelper';

import './ItemEditing.scss';

interface Props {
  event: EventInterface;
  handleStatusEditing: MouseEventHandler<HTMLButtonElement>;
}

export const ItemEditing = observer(({ event, handleStatusEditing }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successEditing, setSuccessEditing] = useState(false);

  const initialValues = useMemo(
    () => ({
      date: getHtmlDateFormat(event.date),
      startTime: event.startTime,
      endTime: event.endTime,
    }),
    [event]
  );

  const identityChecking = useCallback(
    (values: FormValues): boolean =>
      initialValues.date === values.date &&
      initialValues.startTime === values.startTime &&
      initialValues.endTime === values.endTime,
    [initialValues.date, initialValues.endTime, initialValues.startTime]
  );

  const handleSubmit = useCallback(
    (values) => {
      const changedEvent: EventInterface = {
        ...event,
        date: getValidDateFormat(values.date),
        startTime: values.startTime,
        endTime: values.endTime,
      };

      const isTimeFree = myEventStore.defineIsTimeFree(
        changedEvent.date,
        changedEvent.startTime,
        changedEvent.endTime,
        changedEvent.id
      );

      if (identityChecking(values)) {
        setErrorMessage('Ошибка! Данные не были изменены!');
      } else if (!isTimeFree) {
        setErrorMessage('Ошибка! Уже есть событие на указанное время!');
      } else {
        setErrorMessage('');
        myEventStore.changeEvent(changedEvent);
        setSuccessEditing(true);
      }
    },
    [event, identityChecking]
  );

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validate={validateEditingItemForm}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isValid }) => (
        <ItemEditingForm
          handleStatusEditing={handleStatusEditing}
          errorMessage={errorMessage}
          values={values}
          errors={errors}
          touched={touched}
          isValid={isValid}
          successEditing={successEditing}
          eventTitle={event.title}
        />
      )}
    </Formik>
  );
});
