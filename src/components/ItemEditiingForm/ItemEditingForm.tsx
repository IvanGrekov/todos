import React, { MouseEventHandler } from 'react';
import { Form, Field, ErrorMessage, FormikErrors, FormikTouched } from 'formik';
import classNames from 'classnames';

import { FormValues } from '../../types';
import { Notification } from '../Notification';
import { HandlerButton } from '../HandlerButton';
import { Button } from '../Button';

import { makeCapitalFirstLetter } from '../../helpers/EventItemHelper';

import './ItemEditingForm.scss';

const submitText = 'Изменить';
const submitTitle = 'Изменить событие';
const handlerCloserTitle = 'Закрыть форму изменения события';

interface Props {
  handleStatusEditing: MouseEventHandler<HTMLButtonElement>;
  errorMessage: string;
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  isValid: boolean;
  successEditing: boolean;
  eventTitle: string;
}

export const ItemEditingForm = ({
  handleStatusEditing,
  errorMessage,
  values,
  errors,
  touched,
  isValid,
  successEditing,
  eventTitle,
}: Props) => {
  return (
    <Form className="ItemEditingForm">
      <header
        className={classNames('ItemEditingForm__header', {
          'ItemEditingForm__header--success': successEditing,
        })}
      >
        <div
          className={classNames('ItemEditingForm__title', {
            'ItemEditingForm__title--success': successEditing,
          })}
        >
          {successEditing ? (
            <Notification
              text={`Событие "${makeCapitalFirstLetter(
                eventTitle
              )}" успешно изменено!`}
              successStatus={true}
            />
          ) : (
            <h3>{makeCapitalFirstLetter(eventTitle)}</h3>
          )}
        </div>

        <div className="ItemEditingForm__closer-wrapper">
          <HandlerButton
            handler={handleStatusEditing}
            title={handlerCloserTitle}
            whiteBackground={true}
            buttonClose={true}
          />
        </div>
      </header>

      {!successEditing && (
        <>
          <div className="ItemEditingForm__inputs-wrapper">
            <label htmlFor="edit-date" className="ItemEditingForm__label">
              <h3 className="ItemEditingForm__input-title">Новая дата</h3>
              <Field
                id="edit-date"
                type="date"
                name="date"
                className={classNames('ItemEditingForm__input', {
                  'ItemEditingForm__input--error': errors.date && touched.date,
                  'ItemEditingForm__input--success':
                    !errors.date && values.date,
                })}
              />
              <ErrorMessage
                name="date"
                component="div"
                className="ItemEditingForm__error"
              />
            </label>

            <label htmlFor="edit-startTime" className="ItemEditingForm__label">
              <h3 className="ItemEditingForm__input-title">
                Новое время начала
              </h3>
              <Field
                id="edit-startTime"
                type="time"
                name="startTime"
                className={classNames('ItemEditingForm__input', {
                  'ItemEditingForm__input--error':
                    errors.startTime && touched.startTime,
                  'ItemEditingForm__input--success':
                    !errors.startTime && values.startTime,
                })}
              />
              <ErrorMessage
                name="startTime"
                component="div"
                className="ItemEditingForm__error"
              />
            </label>

            <label htmlFor="edit-endTime" className="ItemEditingForm__label">
              <h3 className="ItemEditingForm__input-title">
                Новое время завершения
              </h3>
              <Field
                id="edit-endTime"
                type="time"
                name="endTime"
                className={classNames('ItemEditingForm__input', {
                  'ItemEditingForm__input--error':
                    errors.endTime && touched.endTime,
                  'ItemEditingForm__input--success':
                    !errors.endTime && values.endTime,
                })}
                disabled={values.startTime === ''}
              />
              <ErrorMessage
                name="endTime"
                component="div"
                className="ItemEditingForm__error"
              />
            </label>
          </div>

          <div className="ItemEditingForm__button-wrapper">
            <Button
              text={submitText}
              title={submitTitle}
              disabled={!isValid}
              type={'submit'}
            />
          </div>

          {errorMessage && (
            <div className="ItemEditingForm__error-notification">
              <Notification text={errorMessage} errorStatus={true} />
            </div>
          )}
        </>
      )}
    </Form>
  );
};
