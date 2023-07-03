import moment from 'moment'
import 'moment/locale/ro'

export const getWeekdaysShort = () => {
  moment.updateLocale('ro', {
    week: {
      dow : 1, // Monday is the first day of the week.
    }
  })
  return moment.weekdaysShort(true)
}

export function getAvailableDaysUsedNo(startDate, endDate, defaultFreeDays) {
  let currentDay = startDate.clone();
  let availableDaysUsedNo = 0;

  const defaultFreeDates = defaultFreeDays.map(day => day.date);

  while (currentDay.isSameOrBefore(endDate)) {
    const isDefaultFreeDay = defaultFreeDates.includes(currentDay.format('YYYY-MM-DD'));
    const isWeekend = currentDay.day() === 0 || currentDay.day() === 6;

    if (!isDefaultFreeDay && !isWeekend) {
      availableDaysUsedNo++;
    }

    currentDay.add(1, 'day');
  }

  return availableDaysUsedNo;
}
