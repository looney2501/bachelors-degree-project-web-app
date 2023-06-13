import React, { useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { getWeekdaysShort } from '../../utils/calendarUtils'
import '../../assets/css/Calendar.scss'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { updateVacationPlannedDays } from '../../redux/vacations/vacationActions'

const Calendar = ({ isEditable, year, planningSession }) => {
  const dispatch = useDispatch()

  const weekdaysShort = useMemo(() => getWeekdaysShort(), [])

  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [remainingDays, setRemainingDays] = useState(0)
  const [daysToUsersVacations, setDaysToUsersVacations] = useState(null)
  const [showRemainingDaysError, setShowRemainingDaysError] = useState(false)

  const currentUser = useSelector(state => state.auth.currentUser)
  const vacationsError = useSelector(state => state.vacations.error)

  useEffect(() => {
    setSelectedMonth(moment().year(year).month(0).date(1))
    setSelectedDay(moment().year(year).month(0).date(1))
  }, [])

  useEffect(() => {
    if (vacationsError) {
      const daysToUsersVacations = generateDaysToUsersVacations()

      setDaysToUsersVacations(daysToUsersVacations)
    }
  }, [vacationsError])

  useEffect(() => {
    if (!daysToUsersVacations && planningSession?.vacations) {
      const daysToUsersVacations = generateDaysToUsersVacations()

      setDaysToUsersVacations(daysToUsersVacations)
    }

  }, [planningSession?.vacations])

  const generateDaysToUsersVacations = useCallback(() => {
    let daysToUsersVacations = {}

    planningSession.vacations.forEach(v => {
      const user = v.user

      v.freeDays.forEach(fd => {
        if (!daysToUsersVacations[fd]) {
          daysToUsersVacations[fd] = [user]
        } else {
          daysToUsersVacations[fd].push(user)
        }
      })
    })

    return daysToUsersVacations
  }, [planningSession?.vacations])

  const isWeekendDay = (day) => {
    const year = selectedMonth.year()
    const month = selectedMonth.month()
    const targetDate = moment({ year, month, date: day })

    return targetDate.day() === 0 || targetDate.day() === 6
  }

  const getNationalFreeDay = date => {
    const nationalFreeDays = planningSession.nationalFreeDays

    return nationalFreeDays.find(nfd => nfd.date === date)
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
    if (selectedMonth && selectedDay) {
      let daysInMonth = []
      for (let d = 1; d <= noDaysInMonth(); d++) {
        const fullDateString = moment({
          year: selectedMonth.year(),
          month: selectedMonth.month(),
          date: d
        }).format('YYYY-MM-DD')
        const nationalFreeDay = getNationalFreeDay(fullDateString)
        const weekendDay = isWeekendDay(d)

        daysInMonth.push(
          <td key={d} className={classNames({
            selected: isEditable && d.toString() === selectedDay.format('D') && selectedMonth.format('M Y') === selectedDay.format('M Y'),
            weekend: weekendDay,
            'national-free-day': !!nationalFreeDay
          })}>
            <div className="calendar-day-wrapper"
                 onClick={isEditable && (() => setSelectedDay(moment(selectedMonth.date(d))))}>
              <div className="calendar-day-header">
                <div className="calendar-day">
                  {d}
                </div>
                {nationalFreeDay && (
                  <div title={nationalFreeDay.name} className="national-free-day-name">
                    {nationalFreeDay.name}
                  </div>
                )}
              </div>
              <div className="vacation-day-people">
                <div className="vacation-day-people-list">
                  {daysToUsersVacations[fullDateString] && (
                    <>
                      {daysToUsersVacations[fullDateString].slice(0, 2).map(u => (
                        <div key={u.id} title={`${u.firstName} ${u.lastName}`} className="vacation-day-person">
                          {`${u.firstName} ${u.lastName}`}
                        </div>
                      ))}
                      {daysToUsersVacations[fullDateString].slice(2).length > 0 && (
                        <div
                          title={daysToUsersVacations[fullDateString].slice(2).reduce((message, u, i, a) => {
                            message += `${u.firstName} ${u.lastName}`
                            return i !== a.length - 1 ? message + ',' : message
                          }, '')}
                          className="calendar-day-more-events">
                          +{daysToUsersVacations[fullDateString].length - 2}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {editMode
                && (daysToUsersVacations[fullDateString] ? (
                  <div className="edit-action-wrapper">
                    <button onClick={() => handleDeleteDay(fullDateString)}
                            className="btn btn-outline-danger p-0 d-block w-100">
                      <i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete
                    </button>
                  </div>
                ) : remainingDays > 0 && !weekendDay && !nationalFreeDay && (
                  <div className="edit-action-wrapper">
                    <button onClick={() => handleAddDay(fullDateString, currentUser)}
                            className="btn btn-outline-primary p-0 d-block w-100">
                      <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;Add
                    </button>
                  </div>
                ))}
            </div>
          </td>
        )
      }
      return daysInMonth
    }

  }, [selectedMonth, selectedDay, editMode, daysToUsersVacations])

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
    let i = 0
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
  }, [selectedMonth, selectedDay, editMode, daysToUsersVacations])

  const handleSwitchEditMode = () => {
    if (editMode) {
      console.log('pl')
      if (remainingDays > 0) {
        console.log('pl')
        setShowRemainingDaysError(true)
      } else {
        setShowRemainingDaysError(false)
        dispatch(updateVacationPlannedDays({
          planningSessionId: planningSession.id,
          userId: currentUser.id,
          freeDays: Object.keys(daysToUsersVacations)
        }))
        setEditMode((prevState) => setEditMode(!prevState))
      }
    } else {
      setEditMode((prevState) => setEditMode(!prevState))
    }
  }

  const handleDeleteDay = (day) => {
    setDaysToUsersVacations(prevState => {
      const newState = { ...prevState }
      delete newState[day]

      return newState
    })
    setRemainingDays(prevState => prevState + 1)
  }

  const handleAddDay = (day, user) => {
    setDaysToUsersVacations(prevState => ({
      ...prevState,
      [day]: [user]
    }))
    setRemainingDays(prevState => prevState - 1)
  }

  return (
    <div id="Calendar" className="d-flex flex-column table-container bg-body rounded shadow-sm p-3 h-100">
      {isEditable && (
        <div className="d-flex justify-content-between calendar-edit-header">
          <div className="mb-3 form-check form-switch">
            <input onChange={handleSwitchEditMode} checked={editMode} className="form-check-input" type="checkbox"
                   role="switch"
                   id="editModeSwitchCheckbox"/>
            <label className="form-check-label" htmlFor="editModeSwitchCheckbox">Switch
              to {editMode ? 'view' : 'edit'} mode</label>
          </div>
          {editMode && showRemainingDaysError && (
            <div className="text-danger">
              Mai există zile neasignate
            </div>
          )}
          {editMode && (
            <div>
              Remaining Days: {remainingDays}
            </div>
          )}
        </div>
      )}
      <div className="calendar-header">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            if (selectedMonth.month() !== 0) {
              setSelectedMonth(moment(selectedMonth.subtract(1, 'M')))
            }
          }}
        >
          <SlArrowLeft className="prev-month-button"/>
        </button>
        <div className="selected-month">
          {selectedMonth && selectedMonth.format('MMMM YYYY')}
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            if (selectedMonth.month() !== 11) {
              setSelectedMonth(moment(selectedMonth.add(1, 'M')))
            }
          }}
        >
          <SlArrowRight className="next-month-button"/>
        </button>
      </div>
      <table className="calendar-table">
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
        {selectedDay && selectedMonth && getCalendarSlots()}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
