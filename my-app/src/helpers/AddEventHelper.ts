import { FormValues } from '../types';
import { getValidDate, createTodayDate } from '../helpers/dateHelper';

export const validate = (values: FormValues) => {
  const errors: FormValues = {};

  const minTitleLength = 3;

  if (!values.title) {
    errors.title = 'Обязательно для ввода';
  } else if (values.title.length < minTitleLength) {
    errors.title = `Минимум ${minTitleLength} символа`;
  }

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
  } else if (checkEndTime(values.endTime)) {
    errors.endTime = generateMaxEndTimeError();
  }

  return errors;
};

//#region DateValidation
const checkDate = (value: string): boolean => {
  const date = new Date(value);
  const todayDate = createTodayDate();

  return date < todayDate;
};

const generateDateError = (): string => {
  const todayDate = createTodayDate();
  const dateFormat = 'LL';

  return `Выберите дату начиная от ${getValidDate(todayDate, dateFormat)}`;
};
//#endregion

//#region StartTimeValidation
const minStartTime = 9;

const checkStartTime = (value: string): boolean => {
  const hours = parseInt(value);

  return hours < minStartTime;
};

const generateStartTimeError = (): string =>
  `Минимальное время начала - ${minStartTime}:00`;
//#endregion

//#region EndTimeValidation
const maxEndTime = 18;

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
//#endregion
