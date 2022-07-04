import { FormValues } from '../types';

import {
  getValidDateFormat,
  getTodayDate,
  createTodayWorkingDate,
  roundMinutes,
  getValidMinutes,
} from './dateHelper';

const minTitleLength = 3;
const minStartTime = 9;
const maxStartTime = 17;
const maxStartMinutes = 30;
export const maxEndTime = 18;
const safeMinutesGap = 30;

let currentMinStartTime = minStartTime;
let minStartMinutes = 0;

const validate = (values: FormValues): FormValues => {
  const errors: FormValues = {};

  //#region DateChecking
  if (!values.date) {
    errors.date = 'Обязательно для ввода';
  } else if (checkDate(values.date)) {
    errors.date = generateDateError();
  }
  //#endregion

  //#region StartTimeChecking
  if (!values.startTime) {
    errors.startTime = 'Обязательно для ввода';
  } else if (checkStartTime(values.startTime)) {
    errors.startTime = generateStartTimeError();
  } else if (checkMaxStartTime(values.startTime)) {
    errors.startTime = generateMaxStartTimeError();
  }
  //#endregion

  //#region EndTimeChecking
  if (!values.endTime) {
    errors.endTime = 'Обязательно для ввода';
  } else if (isEndLessThenStart(values.startTime, values.endTime)) {
    errors.endTime = generateEndTimeLessError();
  } else if (isEndEqualStart(values.startTime, values.endTime)) {
    errors.endTime = generateEndTimeEqualError();
  } else if (checkEndTime(values.endTime)) {
    errors.endTime = generateMaxEndTimeError();
  }
  //#endregion

  return errors;
};

export const validateAddingItemForm = (values: FormValues): FormValues => {
  const errors: FormValues = { ...validate(values) };

  if (!values.title) {
    errors.title = 'Обязательно для ввода';
  } else if (values.title.length < minTitleLength) {
    errors.title = `Минимум ${minTitleLength} символа`;
  }

  return errors;
};

export const validateEditingItemForm = (values: FormValues): FormValues => {
  const errors: FormValues = { ...validate(values) };

  return errors;
};

//#region DateValidation
const checkDate = (value: string): boolean => {
  const date = new Date(value).setHours(0);
  const todayDate = getTodayDate().getTime();
  const todayWorkingDate = createTodayWorkingDate().getTime();

  if (date === todayDate) {
    const date = new Date();

    date.setMinutes(roundMinutes(date.getMinutes()) + safeMinutesGap);

    currentMinStartTime = date.getHours();
    minStartMinutes = date.getMinutes();
  } else {
    currentMinStartTime = minStartTime;
    minStartMinutes = 0;
  }

  return date < todayWorkingDate;
};

const generateDateError = (): string => {
  const todayWorkingDate = createTodayWorkingDate();
  const dateFormat = 'LL';

  return `Выберите дату начиная от ${getValidDateFormat(
    todayWorkingDate,
    dateFormat
  )}`;
};
//#endregion

//#region StartTimeValidation
const checkStartTime = (value: string): boolean => {
  const hours = parseInt(value);
  const minutes = parseInt(value.slice(3)); // Input time format - 09:00

  if (hours <= currentMinStartTime) {
    return hours < currentMinStartTime || minutes < minStartMinutes;
  }

  return hours < currentMinStartTime;
};

const checkMaxStartTime = (value: string): boolean => {
  const hours = parseInt(value);
  const minutes = parseInt(value.slice(3)); // Input time format - 09:00

  if (hours > maxStartTime) {
    return true;
  }

  if (hours === maxStartTime) {
    return minutes > maxStartMinutes;
  }

  return false;
};

const generateStartTimeError = (): string =>
  `Минимальное время начала - ${currentMinStartTime}:${getValidMinutes(
    minStartMinutes
  )}`;

const generateMaxStartTimeError = (): string =>
  `Максимальное время начала - ${maxStartTime}:${getValidMinutes(
    maxStartMinutes
  )}`;
//#endregion

//#region EndTimeValidation
const checkEndTime = (value: string): boolean => {
  const hours = parseInt(value);
  const minutes = parseInt(value.slice(3)); // Input time format - 09:00

  if (hours > maxEndTime) {
    return true;
  }

  if (hours === maxEndTime && minutes > 0) {
    return true;
  }

  return false;
};

const generateMaxEndTimeError = (): string =>
  `Максимальное время завершения - ${maxEndTime}:00`;

const isEndLessThenStart = (
  startTime: string = '09:00',
  endTime: string
): boolean => {
  const startHours = parseInt(startTime);
  const startMinutes = parseInt(startTime.slice(3)); // Input time format - 09:00
  const endHours = parseInt(endTime);
  const endMinutes = parseInt(endTime.slice(3)); // Input time format - 09:00

  if (startHours > endHours) {
    return true;
  }

  if (startHours === endHours && startMinutes > endMinutes) {
    return true;
  }

  return false;
};

const generateEndTimeLessError = (): string =>
  'Время завершения меньше времени начала';

const isEndEqualStart = (
  startTime: string = '09:00',
  endTime: string
): boolean => {
  const startHours = parseInt(startTime);
  const startMinutes = parseInt(startTime.slice(3)); // Input time format - 09:00
  const endHours = parseInt(endTime);
  const endMinutes = parseInt(endTime.slice(3)); // Input time format - 09:00

  return startHours === endHours && startMinutes === endMinutes;
};

const generateEndTimeEqualError = (): string =>
  'Время завершения идентично времени начала';
//#endregion
