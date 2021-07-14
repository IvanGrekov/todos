import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

import myEventStore from '../../store';
import { validate } from '../../helpers/FormHelper';
import { getValidDateFormat } from '../../helpers/dateHelper';
import { EventInterface } from '../../types';
import { getHtmlDateFormat } from '../../helpers/dateHelper';
import { makeCapitalFirstLetter } from '../../helpers/EventItemHelper';

import './ItemEditing.scss';

export const ItemEditing = observer(
  ({
    event,
    setStatusEditing,
  }: {
    event: EventInterface;
    setStatusEditing: Function;
  }) => {
    const {
      date,
      startTime,
      endTime,
    }: {
      date: string;
      startTime: string;
      endTime: string;
    } = event;

    const handleSubmit = useCallback(
      (values, { resetForm }) => {
        const changedEvent: EventInterface = {
          ...event,
          date: date || values.date,
          startTime: startTime || values.startTime,
          endTime: endTime || values.endTime,
        };

        setStatusEditing(false);

        console.log(changedEvent);
      },
      [date, endTime, event, setStatusEditing, startTime]
    );

    return (
      <Formik
        initialValues={{
          date: getHtmlDateFormat(date),
          startTime: startTime,
          endTime: endTime,
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="ItemEditing">
            <header className="ItemEditing__header">
              <h3 className="ItemEditing__title">
                {makeCapitalFirstLetter(event.title)}
              </h3>

              <button
                className="ItemEditing__closer"
                title="Закрыть форму изменения события"
                onClick={() => {
                  setStatusEditing(false);
                }}
              />
            </header>

            <div className="ItemEditing__inputs-wrapper">
              <label htmlFor="date" className="ItemEditing__label">
                <h3 className="ItemEditing__input-title">Новая дата</h3>
                <Field
                  id="date"
                  type="date"
                  name="date"
                  className={classNames('ItemEditing__input', {
                    'ItemEditing__input--error': errors.date && touched.date,
                    'ItemEditing__input--success': !errors.date && values.date,
                  })}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="ItemEditing__error"
                />
              </label>

              <label htmlFor="startTime" className="ItemEditing__label">
                <h3 className="ItemEditing__input-title">Новое время начала</h3>
                <Field
                  id="startTime"
                  type="time"
                  name="startTime"
                  className={classNames('ItemEditing__input', {
                    'ItemEditing__input--error':
                      errors.startTime && touched.startTime,
                    'ItemEditing__input--success':
                      !errors.startTime && values.startTime,
                  })}
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="ItemEditing__error"
                />
              </label>

              <label htmlFor="endTime" className="ItemEditing__label">
                <h3 className="ItemEditing__input-title">
                  Новое время завершения
                </h3>
                <Field
                  id="endTime"
                  type="time"
                  name="endTime"
                  className={classNames('ItemEditing__input', {
                    'ItemEditing__input--error':
                      errors.endTime && touched.endTime,
                    'ItemEditing__input--success':
                      !errors.endTime && values.endTime,
                  })}
                  disabled={values.startTime === ''}
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="ItemEditing__error"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid || !dirty}
              className="ItemEditing__button"
            >
              Изменить
            </button>
          </Form>
        )}
      </Formik>
    );
  }
);
