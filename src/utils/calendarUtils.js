import moment from 'moment/moment'

export const getWeekdaysShort = () => {
  moment.updateLocale('en', {
    week: {
      dow : 1, // Monday is the first day of the week.
    }
  })
  return moment.weekdaysShort(true)
}
