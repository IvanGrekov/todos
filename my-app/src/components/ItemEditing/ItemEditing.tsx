import React, { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

import myEventStore from '../../store';
import { validateEditingItemForm } from '../../helpers/FormHelper';
import { getValidDateFormat } from '../../helpers/dateHelper';
import { EventInterface } from '../../types';
import { getHtmlDateFormat } from '../../helpers/dateHelper';
import { makeCapitalFirstLetter } from '../../helpers/EventItemHelper';
import { ButtonHandler } from '../ButtonHandler';
import { FormValues } from '../../types';

import './ItemEditing.scss';

export const ItemEditing = observer(
  ({
    event,
    handleStatusEditing,
  }: {
    event: EventInterface;
    handleStatusEditing: Function;
  }) => {
    const [error, setError] = useState(false);
    const [textError, setTextError] = useState('');
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
          setError(true);
          setTextError('Ошибка! Данные не были изменены!');
        } else if (!isTimeFree) {
          setError(true);
          setTextError('Ошибка! Уже есть событие на указанное время!');
        } else {
          setError(false);
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
          <Form className="ItemEditing">
            <header
              className={classNames('ItemEditing__header', {
                'ItemEditing__header--success': successEditing,
              })}
            >
              {successEditing ? (
                <>
                  <h3 className="ItemEditing__title ItemEditing__title--success">
                    Событие {makeCapitalFirstLetter(event.title)} успешно
                    изменено!
                  </h3>
                </>
              ) : (
                <>
                  <h3 className="ItemEditing__title">
                    {makeCapitalFirstLetter(event.title)}
                  </h3>
                </>
              )}

              <div className="ItemEditing__closer">
                <ButtonHandler
                  handler={handleStatusEditing}
                  title={'Закрыть форму изменения события'}
                  whiteBackground={true}
                  buttonClose={true}
                />
              </div>
            </header>

            {!successEditing && (
              <>
                <div className="ItemEditing__inputs-wrapper">
                  <label htmlFor="edit-date" className="ItemEditing__label">
                    <h3 className="ItemEditing__input-title">Новая дата</h3>
                    <Field
                      id="edit-date"
                      type="date"
                      name="date"
                      className={classNames('ItemEditing__input', {
                        'ItemEditing__input--error':
                          errors.date && touched.date,
                        'ItemEditing__input--success':
                          !errors.date && values.date,
                      })}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="ItemEditing__error"
                    />
                  </label>

                  <label
                    htmlFor="edit-startTime"
                    className="ItemEditing__label"
                  >
                    <h3 className="ItemEditing__input-title">
                      Новое время начала
                    </h3>
                    <Field
                      id="edit-startTime"
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

                  <label htmlFor="edit-endTime" className="ItemEditing__label">
                    <h3 className="ItemEditing__input-title">
                      Новое время завершения
                    </h3>
                    <Field
                      id="edit-endTime"
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
                  disabled={!isValid}
                  className="ItemEditing__button"
                >
                  Изменить
                </button>

                {error && <p className="ItemEditing__error">{textError}</p>}
              </>
            )}
          </Form>
        )}
      </Formik>
    );
  }
);
