import moment from 'moment';
import 'moment/locale/ru';

const dateFormat = 'L'; // 12.07.2021

export const getValidDate = (date: Date): string => {
  moment.locale('ru');

  const initialDateFormat = moment(date);

  return initialDateFormat.format(dateFormat);
};
