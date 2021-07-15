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
const maxEndTime = 18;
const safeTimeGap = 30;

let currentMinStartTime = minStartTime;
let minStartTimeMinutes = 0;

const validate = (values: FormValues): FormValues => {
  const errors: FormValues = {};

  if (!values.date) {
    errors.date = 'Обязательно для ввода';
  } else if (checkDate(values.date)) {
    errors.date = generateDateError();
  }

  if (!values.startTime) {
    errors.startTime = 'Обязательно для ввода';
  } else if (checkStartTime(values.startTime)) {
    errors.startTime = generateStartTimeError();
  }

  if (!values.endTime) {
    errors.endTime = 'Обязательно для ввода';
  } else if (isEndLessThenStart(values.startTime, values.endTime)) {
    errors.endTime = generateEndTimeLessError();
  } else if (isEndEqualStart(values.startTime, values.endTime)) {
    errors.endTime = generateEndTimeEqualError();
  } else if (checkEndTime(values.endTime)) {
    errors.endTime = generateMaxEndTimeError();
  }

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
  const date = new Date(value);
  date.setHours(0);

  const todayDate = createTodayWorkingDate();

  if (date.getTime() === getTodayDate().getTime()) {
    const date = new Date();

    date.setMinutes(roundMinutes(date.getMinutes()) + safeTimeGap);

    currentMinStartTime = date.getHours();
    minStartTimeMinutes = date.getMinutes();
  } else {
    currentMinStartTime = minStartTime;
    minStartTimeMinutes = 0;
  }

  return date < todayDate;
};

const generateDateError = (): string => {
  const todayDate = createTodayWorkingDate();
  const dateFormat = 'LL';

  return `Выберите дату начиная от ${getValidDateFormat(
    todayDate,
    dateFormat
  )}`;
};
//#endregion

//#region StartTimeValidation
const checkStartTime = (value: string): boolean => {
  const hours = parseInt(value);
  const minutes = parseInt(value.slice(3));

  if (hours <= currentMinStartTime) {
    return hours < currentMinStartTime || minutes < minStartTimeMinutes;
  }

  return hours < currentMinStartTime;
};

const generateStartTimeError = (): string =>
  `Минимальное время начала - ${currentMinStartTime}:${getValidMinutes(
    minStartTimeMinutes
  )}`;
//#endregion

//#region EndTimeValidation
const checkEndTime = (value: string): boolean => {
  const hours = parseInt(value);
  const minutes = parseInt(value.slice(3));

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
  const startMinutes = parseInt(startTime.slice(3));
  const endHours = parseInt(endTime);
  const endMinutes = parseInt(endTime.slice(3));

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
  const startMinutes = parseInt(startTime.slice(3));
  const endHours = parseInt(endTime);
  const endMinutes = parseInt(endTime.slice(3));

  if (startHours === endHours && startMinutes === endMinutes) {
    return true;
  }

  return false;
};

const generateEndTimeEqualError = (): string =>
  'Время завершения идентично времени начала';
//#endregion
