import moment from 'moment';
import 'moment/locale/ru';

export const dateFormat = 'L'; // 12.07.2021

export const getValidDateFormat = (
  date: Date | string,
  format?: string
): string => {
  moment.locale('ru');

  const initialDateFormat = moment(date);

  return initialDateFormat.format(format || dateFormat);
};

const getDateForDisplay = (value: string): string => {
  moment.locale('ru');

  const date = getHtmlDateFormat(value);

  return getValidDateFormat(date, 'LL'); // LL ===  14 июля 2021 г.
};

export const getDayForDisplay = (value: string): string =>
  getDateForDisplay(value).split(' ')[0];

export const getMonthForDisplay = (value: string): string =>
  getDateForDisplay(value).split(' ')[1];

export const getYearForDisplay = (value: string): string =>
  getDateForDisplay(value).split(' ')[2];

export const getHtmlDateFormat = (value: string): string =>
  value.split('.').reverse().join('-'); // Initial format at top of this file

export const createTodayDate = (): Date => {
  const currentDate = new Date();

  if (currentDate.getHours() >= 18) {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
  }

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
};

export const roundMinutes = (value: number): number =>
  Math.ceil(value / 10) * 10;

export const getValidMinutes = (value: number): string =>
  value < 10 ? `0${value}` : `${value}`;
