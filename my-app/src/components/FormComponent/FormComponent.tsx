import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import myEventStore from '../../store';
import { validateAddingItemForm } from '../../helpers/FormHelper';
import { getValidDateFormat } from '../../helpers/dateHelper';
import { EventInterface } from '../../types';

import './FormComponent.scss';

export const FormComponent = observer(
  ({
    setAddingError,
    setAddingSuccess,
  }: {
    setAddingError: Function;
    setAddingSuccess: Function;
  }) => {
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
          setAddingSuccess(false);
        }
      },
      [setAddingError, setAddingSuccess]
    );

    return (
      <Formik
        initialValues={{ title: '', date: '', startTime: '', endTime: '' }}
        validate={validateAddingItemForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="FormComponent">
            <div className="FormComponent__inputs-wrapper">
              <label htmlFor="title" className="FormComponent__label">
                <h3 className="FormComponent__input-title">Название</h3>
                <Field
                  id="title"
                  type="text"
                  name="title"
                  className={classNames('FormComponent__input', {
                    'FormComponent__input--error':
                      errors.title && touched.title,
                    'FormComponent__input--success':
                      !errors.title && values.title,
                  })}
                  placeholder="Название события"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="FormComponent__error"
                />
              </label>

              <label htmlFor="date" className="FormComponent__label">
                <h3 className="FormComponent__input-title">Дата</h3>
                <Field
                  id="date"
                  type="date"
                  name="date"
                  className={classNames('FormComponent__input', {
                    'FormComponent__input--error': errors.date && touched.date,
                    'FormComponent__input--success':
                      !errors.date && values.date,
                  })}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="FormComponent__error"
                />
              </label>

              <label htmlFor="startTime" className="FormComponent__label">
                <h3 className="FormComponent__input-title">Время начала</h3>
                <Field
                  id="startTime"
                  type="time"
                  name="startTime"
                  className={classNames('FormComponent__input', {
                    'FormComponent__input--error':
                      errors.startTime && touched.startTime,
                    'FormComponent__input--success':
                      !errors.startTime && values.startTime,
                  })}
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="FormComponent__error"
                />
              </label>

              <label htmlFor="endTime" className="FormComponent__label">
                <h3 className="FormComponent__input-title">Время завершения</h3>
                <Field
                  id="endTime"
                  type="time"
                  name="endTime"
                  className={classNames('FormComponent__input', {
                    'FormComponent__input--error':
                      errors.endTime && touched.endTime,
                    'FormComponent__input--success':
                      !errors.endTime && values.endTime,
                  })}
                  disabled={values.startTime === ''}
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="FormComponent__error"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!isValid || !dirty}
              className="FormComponent__button"
            >
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    );
  }
);
