import React, { useEffect, useMemo, useState } from 'react'
import dashboardLayout from '../../layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPlanningSessionsAllYears,
  getPlanningSessionAllVacationsByYear, getPlanningSessionThinByYear
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
      <NewVacationRequestModal id="vacationRequestModal" />
      <div id="employeeDashboardPage" className="h-100 d-flex flex-column">
        {nextYearNewRequestMessage && (
          <div className="row">
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
              Este momentul planificării concediilor pentru anul urmator! Click
              <span data-bs-toggle="modal" data-bs-target="#vacationRequestModal"
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
                {allYears && allYears.map(y => (
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
                Vizualizați Planificare
              </button>
            </div>
          </div>
          <div className="col-8 h-100 d-flex flex-column justify-content-center">
            {planningSession?.vacations ?
              isGenerated ? (
                <Calendar year={selectedYear} planningSession={planningSession}/>
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
