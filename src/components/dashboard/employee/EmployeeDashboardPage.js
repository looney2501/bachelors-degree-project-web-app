import React, { useEffect, useMemo, useState } from 'react'
import dashboardLayout from '../../layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPlanningSessionAllVacationsByYear,
  getPlanningSessionsAllYears,
  getPlanningSessionThinByYear
} from '../../../redux/planningSessions/planningSessionsActions'

import Calendar from '../../calendar/Calendar'
import moment from 'moment'
import NewVacationRequestModal from '../../modal/NewVacationRequestModal'

const EmployeeDashboardPage = () => {
  const dispatch = useDispatch()
  const allYears = useSelector(state => state.planningSessions.years)
  const planningSession = useSelector(state => state.planningSessions.planningSession)
  const hasRequested = useSelector(state => state.planningSessions.hasRequested)
  const isGenerated = useSelector(state => state.planningSessions.isGenerated)

  const [selectedYear, setSelectedYear] = useState()

  useEffect(() => {
    dispatch(getPlanningSessionsAllYears())
  }, [])

  useEffect(() => {
    if (allYears) {
      setSelectedYear(allYears[0])
      if (allYears[0] === moment().year() + 1) {
        dispatch(getPlanningSessionThinByYear(allYears[0]))
      }
    }
  }, [allYears])

  const handleYearSelect = (e) => {
    setSelectedYear(e.target.value)
  }

  const handleViewPlanning = (_) => {
    dispatch(getPlanningSessionAllVacationsByYear(selectedYear))
  }

  const nextYearNewRequestMessage = useMemo(() => {
    if (allYears) {
      return (allYears.length > 0 && allYears[0] === moment().year() + 1)
        && !hasRequested
    }
  }, [allYears, hasRequested])

  return (
    <>
      <NewVacationRequestModal id="vacationRequestModal"/>
      <div id="employeeDashboardPage" className="h-100 d-flex flex-column">
        {nextYearNewRequestMessage && (
          <div className="row">
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
              Este momentul planificării concediilor pentru anul urmator! Click
              <span id="initializeRequestVacation" data-bs-toggle="modal" data-bs-target="#vacationRequestModal"
                    className="alert-link" role="button"> aici </span>
              pentru a realiza o cerere de planificare de concediu.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        )}
        <div className="row flex-grow-1">
          <div className="col-4 h-100 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
              <p className="h3 mb-0 mx-4 lh-base text-right">Selectați anul</p>
              <select className="form-select year-form-select" onChange={handleYearSelect}>
                <option disabled>Alegeti Anul</option>
                {allYears && allYears
                  .filter((y, i) => i === 0 ? hasRequested : true)
                  .map((y, i) => (
                    <option key={y} value={y}>{y}</option>
                  ))
                }
              </select>
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary btn-md"
                onClick={handleViewPlanning}
              >
                Vizualizați planificare
              </button>
            </div>
            {planningSession?.requestedIntervals && (
              <div className="mt-4 d-flex justify-content-center">
                <div className="bg-body rounded shadow-sm p-3 overflow-auto">
                  <h5 className="pb-2 m-0 text-default">Intervale preferate</h5>
                  <div className="employees-table table-container overflow-auto">
                    <div className="d-flex text-muted overflow-auto">
                      <table className="table overflow-auto">
                        <thead>
                        <tr>
                          <th>Dată început</th>
                          <th>Dată final</th>
                          <th>Importanță</th>
                        </tr>
                        </thead>
                        <tbody>
                        {planningSession.requestedIntervals.map((i) => (
                          <tr key={i}>
                            <td>{i.startDate}</td>
                            <td>{i.endDate}</td>
                            <td style={{ textAlign: 'center' }}>{i.importanceLevel}</td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-8 h-100 d-flex flex-column justify-content-center">
            {selectedYear && planningSession?.vacations ?
              isGenerated ? (
                <Calendar year={selectedYear} planningSession={planningSession} isEditable />
              ) : (
                <div className="">
                  <p className="h3 text-center">Planificarea nu a fost încă generată!</p>
                </div>
              ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default dashboardLayout(EmployeeDashboardPage)
