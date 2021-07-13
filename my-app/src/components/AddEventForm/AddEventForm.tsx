import React, { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { validate } from '../../helpers/AddEventHelper';
import { getValidDate } from '../../helpers/dateHelper';
import { EventInterface } from '../../types';

import './AddEventForm.scss';

export const AddEvent = () => {
  const handleSubmit = useCallback((values, { resetForm }) => {
    const { title, date, startTime, endTime } = values;
    const newEvent: EventInterface = {
      title,
      startTime,
      endTime,
      date: getValidDate(date),
      id: uuidv4(),
    };

    console.log(newEvent);

    resetForm();
  }, []);

  return (
    <div className="AddEventForm">
      <h2 className="AddEventForm__title">Добавить мероприятие</h2>

      <Formik
        initialValues={{ title: '', date: '', startTime: '', endTime: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="AddEventForm__form">
            <div className="AddEventForm__inputs-wrapper">
              <label htmlFor="title" className="AddEventForm__label">
                <h3 className="AddEventForm__input-title">Название</h3>
                <Field
                  id="title"
                  type="text"
                  name="title"
                  className={classNames('AddEventForm__input', {
                    'AddEventForm__input--error': errors.title && touched.title,
                    'AddEventForm__input--success':
                      !errors.title && values.title,
                  })}
                  placeholder="Название события"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="AddEventForm__error"
                />
              </label>

              <label htmlFor="date" className="AddEventForm__label">
                <h3 className="AddEventForm__input-title">Дата</h3>
                <Field
                  id="date"
                  type="date"
                  name="date"
                  className={classNames('AddEventForm__input', {
                    'AddEventForm__input--error': errors.date && touched.date,
                    'AddEventForm__input--success': !errors.date && values.date,
                  })}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="AddEventForm__error"
                />
              </label>

              <label htmlFor="startTime" className="AddEventForm__label">
                <h3 className="AddEventForm__input-title">Время начала</h3>
                <Field
                  id="startTime"
                  type="time"
                  name="startTime"
                  className={classNames('AddEventForm__input', {
                    'AddEventForm__input--error':
                      errors.startTime && touched.startTime,
                    'AddEventForm__input--success':
                      !errors.startTime && values.startTime,
                  })}
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="AddEventForm__error"
                />
              </label>

              <label htmlFor="endTime" className="AddEventForm__label">
                <h3 className="AddEventForm__input-title">Время завершения</h3>
                <Field
                  id="endTime"
                  type="time"
                  name="endTime"
                  className={classNames('AddEventForm__input', {
                    'AddEventForm__input--error':
                      errors.endTime && touched.endTime,
                    'AddEventForm__input--success':
                      !errors.endTime && values.endTime,
                  })}
                  disabled={values.startTime === ''}
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="AddEventForm__error"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid || !dirty}
              className="AddEventForm__button"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
