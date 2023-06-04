import React, { useEffect, useMemo, useState } from 'react'
import dashboardLayout from '../../layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPlanningSessionsAllYears,
  getPlanningSessionAllVacationsByYear, generateVacationsSchedule
} from '../../../redux/planningSessions/planningSessionsActions'
import EmployeesTable from './EmployeesTable'
import Calendar from '../../calendar/Calendar'
import moment from 'moment'
import NewPlanningSessionModal from '../../modal/NewPlanningSessionModal'

const ManagerDashboardPage = () => {
  const dispatch = useDispatch()
  const allYears = useSelector(state => state.planningSessions.years)
  const planningSession = useSelector(state => state.planningSessions.planningSession)
  const isGenerated = useSelector(state => state.planningSessions.isGenerated)
  const employees = useMemo(() => [
    {
      id: 1,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 2,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 3,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 4,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 5,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 6,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 7,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 8,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 9,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 10,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 11,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 12,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
    {
      id: 13,
      first_name: 'Alex',
      last_name: 'Pop',
      email: 'alex.pop@email.com',
    },
  ], [])

  const [selectedYear, setSelectedYear] = useState()

  useEffect(() => {
    dispatch(getPlanningSessionsAllYears())
  }, [])

  useEffect(() => {
    if (allYears) {
      setSelectedYear(allYears[0])
    }
  }, [allYears])

  const handleYearSelect = (e) => {
    setSelectedYear(e.target.value)
  }

  const handleViewPlanning = (_) => {
    dispatch(getPlanningSessionAllVacationsByYear(selectedYear))
  }

  const handleGeneratePlanning = (_) => {
    console.log(planningSession.id)
    dispatch(generateVacationsSchedule(planningSession.id))
  }

  const nextYearWithoutPlanningSession = useMemo(() => {
    if (allYears) {
      return ((allYears.length > 0 && allYears[0] !== moment().year() + 1) || allYears.length === 0)
      // && moment().month() === 11
    }
  }, [allYears])

  return (
    <>
      <NewPlanningSessionModal id="initialisePlanningSessionModal"/>
      <div id="managerDashboardPage" className="h-100 d-flex flex-column">
        {nextYearWithoutPlanningSession && (
          <div className="row">
            <div className="alert alert-primary alert-dismissible fade show" role="alert">
              Este momentul planificării concediilor pentru anul urmator! Click
              <span data-bs-toggle="modal" data-bs-target="#initialisePlanningSessionModal"
                    className="alert-link" role="button"> aici </span>
              pentru a inițializa o nouă sesiune de planificări de concedii.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        )}
        <div className="row flex-grow-1">
          <div className="col-4 h-100 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center">
              <p className="h3 mb-0 mx-4 lh-base text-right">Selectati anul</p>
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
                Vizualizați planificare
              </button>
            </div>
            <div className="mt-4 d-flex justify-content-center">
              <EmployeesTable employees={employees}/>
            </div>
          </div>
          <div className="col-8 h-100 d-flex flex-column justify-content-center">
            {selectedYear && planningSession?.vacations ?
              isGenerated ? (
                <Calendar year={selectedYear} planningSession={planningSession}/>
              ) : (
                <div className="">
                  <p className="h3 text-center">Planificarea nu a fost încă generată!</p>
                  <div className="mt-4 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-md"
                      onClick={handleGeneratePlanning}
                    >
                      Generează planificare
                    </button>
                  </div>
                </div>
              ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default dashboardLayout(ManagerDashboardPage)
