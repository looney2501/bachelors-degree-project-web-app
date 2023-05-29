import React, { useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { getWeekdaysShort } from '../../utils/calendarUtils'
import '../../assets/css/Calendar.scss'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import classNames from 'classnames'

const Calendar = ({ isEditable, year, planningSession }) => {
  const weekdaysShort = useMemo(() => getWeekdaysShort(), [])

  const [selectedDay, setSelectedDay] = useState(moment())
  const [selectedMonth, setSelectedMonth] = useState(moment())

  useEffect(() => {
    setSelectedMonth(moment().year(year).month(0).date(1))
    setSelectedDay(moment().year(year).month(0).date(1))
  }, [])

  const isWeekendDay = (day) => {
    const year = selectedMonth.year()
    const month = selectedMonth.month()
    const targetDate = moment({ year, month, date: day });

    return targetDate.day() === 0 || targetDate.day() === 6;
  }

  const firstDayOfMonth = useCallback(() => {
    return (Number.parseInt(selectedMonth
      .startOf('month')
      .format('d')) + 6) % 7
  }, [selectedMonth])

  const noDaysInMonth = useCallback(() => {
    return selectedMonth
      .daysInMonth()
  }, [selectedMonth])

  const getBeforeBlankDays = useCallback(() => {
    let blanks = []
    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(
        <td key={-i} className="calendar-day-empty">{''}</td>
      )
    }
    return blanks
  }, [selectedMonth])

  const getMonthDays = useCallback(() => {
    let daysInMonth = []
    for (let d = 1; d <= noDaysInMonth(); d++) {
      daysInMonth.push(
        <td key={d} className={classNames({
          selected: isEditable && d.toString() === selectedDay.format('D') && selectedMonth.format('M Y') === selectedDay.format('M Y'),
          weekend: isWeekendDay(d)
        })}>
          <div className='calendar-day-wrapper' onClick={isEditable && (() => setSelectedDay(moment(selectedMonth.date(d)))) }>
            <div className='calendar-day'>
              <div className='calendar-day-circle'>
                {d}
              </div>
            </div>
            <div className='calendar-day-events'>
              <div className='calendar-day-event-list'>
              </div>
            </div>
          </div>
        </td>
      )
    }
    return daysInMonth
  }, [selectedMonth, selectedDay])

  const getAfterBlankDays = useCallback(() => {
    let blanks = []
    const noBeforeBlanks = firstDayOfMonth()
    const noMonthDays = noDaysInMonth()
    const totalDays = noMonthDays + noBeforeBlanks
    for (let d = 0; d < 42 - totalDays; d++) {
      blanks.push(
        <td key={42 - totalDays + d} className="calendar-day-empty">{''}</td>
      )
    }
    return blanks
  }, [selectedMonth])

  const getCalendarSlots = useCallback(() => {
    const totalSlots = [...getBeforeBlankDays(), ...getMonthDays(), ...getAfterBlankDays()]
    const rows = []
    for (let i = 0; i < 6; i++) {
      rows.push(totalSlots.slice(i * 7, (i + 1) * 7))
    }
    let i = 0;
    return (
      <>
        {rows.map(row => {
          return (
            <tr key={i++}>{row}</tr>
          )
        })
        }
      </>
    )
  }, [selectedMonth, selectedDay])

  return (
    <div id="Calendar" className="d-flex flex-column table-container bg-body rounded shadow-sm p-3 h-100">
      <div className='calendar-header'>
        <button className="btn btn-outline-primary" onClick={() => setSelectedMonth(moment(selectedMonth.subtract(1, 'M')))}>
          <SlArrowLeft className='prev-month-button' />
        </button>
        <div className='selected-month'>
          {selectedMonth.format('MMMM YYYY')}
        </div>
        <button className="btn btn-outline-primary" onClick={() => setSelectedMonth(moment(selectedMonth.add(1, 'M')))}>
          <SlArrowRight className='next-month-button' />
        </button>
      </div>
      <table className='calendar-table'>
        <thead>
        <tr>
          {weekdaysShort.map(day => {
              return (
                <th key={day} className="week-day">
                  {day}
                </th>
              )
            }
          )}
        </tr>
        </thead>
        <tbody>
        {getCalendarSlots()}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
