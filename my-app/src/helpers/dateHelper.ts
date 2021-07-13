import moment from 'moment';
import 'moment/locale/ru';

export const dateFormat = 'L'; // 12.07.2021

export const getValidDate = (date: Date | string, format?: string): string => {
  moment.locale('ru');

  const initialDateFormat = moment(date);

  return initialDateFormat.format(format || dateFormat);
};

export const createTodayDate = (): Date => {
  const currentDate = new Date();

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
};
