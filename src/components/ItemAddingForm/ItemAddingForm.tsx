import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { EventInterface } from '../../types';
import myEventStore from '../../store';

import { validateAddingItemForm } from '../../helpers/FormHelper';
import { getValidDateFormat } from '../../helpers/dateHelper';

import { Button } from '../Button';

import './ItemAddingForm.scss';

const submitText = 'Добавить';
const submitTitle = 'Добавить событие';

interface Props {
  setAddingError: Function;
  setAddingSuccess: Function;
}

export const ItemAddingForm = observer(
  ({ setAddingError, setAddingSuccess }: Props) => {
    const clearSuccess = useCallback(() => {
      setAddingSuccess(false);
    }, [setAddingSuccess]);

    const handleSubmit = useCallback(
      (values, { resetForm }) => {
        const { title, date, startTime, endTime } = values;
        const newEvent: EventInterface = {
          title,
          startTime,
          endTime,
          date: getValidDateFormat(date),
          id: uuidv4(),
        };

        const isTimeFree = myEventStore.defineIsTimeFree(
          newEvent.date,
          newEvent.startTime,
          newEvent.endTime
        );

        if (isTimeFree) {
          myEventStore.addEvent(newEvent);
          resetForm();
          setAddingError(false);
          setAddingSuccess(true);
        } else {
          setAddingError(true);
          clearSuccess();
        }
      },
      [clearSuccess, setAddingError, setAddingSuccess]
    );

    return (
      <Formik
        initialValues={{ title: '', date: '', startTime: '', endTime: '' }}
        validate={validateAddingItemForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="ItemAddingForm">
            <div className="ItemAddingForm__inputs-wrapper">
              <label htmlFor="title" className="ItemAddingForm__label">
                <h3 className="ItemAddingForm__input-title">Название</h3>
                <Field
                  id="title"
                  type="text"
                  name="title"
                  className={classNames('ItemAddingForm__input', {
                    'ItemAddingForm__input--error':
                      errors.title && touched.title,
                    'ItemAddingForm__input--success':
                      !errors.title && values.title,
                  })}
                  placeholder="Название события"
                  onClick={clearSuccess}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="ItemAddingForm__error"
                />
              </label>

              <label htmlFor="date" className="ItemAddingForm__label">
                <h3 className="ItemAddingForm__input-title">Дата</h3>
                <Field
                  id="date"
                  type="date"
                  name="date"
                  className={classNames('ItemAddingForm__input', {
                    'ItemAddingForm__input--error': errors.date && touched.date,
                    'ItemAddingForm__input--success':
                      !errors.date && values.date,
                  })}
                  onClick={clearSuccess}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="ItemAddingForm__error"
                />
              </label>

              <label htmlFor="startTime" className="ItemAddingForm__label">
                <h3 className="ItemAddingForm__input-title">Время начала</h3>
                <Field
                  id="startTime"
                  type="time"
                  name="startTime"
                  className={classNames('ItemAddingForm__input', {
                    'ItemAddingForm__input--error':
                      errors.startTime && touched.startTime,
                    'ItemAddingForm__input--success':
                      !errors.startTime && values.startTime,
                  })}
                  onClick={clearSuccess}
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="ItemAddingForm__error"
                />
              </label>

              <label htmlFor="endTime" className="ItemAddingForm__label">
                <h3 className="ItemAddingForm__input-title">
                  Время завершения
                </h3>
                <Field
                  id="endTime"
                  type="time"
                  name="endTime"
                  className={classNames('ItemAddingForm__input', {
                    'ItemAddingForm__input--error':
                      errors.endTime && touched.endTime,
                    'ItemAddingForm__input--success':
                      !errors.endTime && values.endTime,
                  })}
                  disabled={values.startTime === '' || errors.startTime}
                  onClick={clearSuccess}
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="ItemAddingForm__error"
                />
              </label>
            </div>

            <div className="ItemAddingForm__button-wrapper">
              <Button
                text={submitText}
                title={submitTitle}
                disabled={!isValid || !dirty}
                type={'submit'}
              />
            </div>
          </Form>
        )}
      </Formik>
    );
  }
);
