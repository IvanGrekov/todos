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
