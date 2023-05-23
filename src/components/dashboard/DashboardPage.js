import React, { useEffect, useMemo, useState } from 'react'
import adminLayout from '../adminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getPlanningSessionsAllYears } from '../../redux/planningSessions/planningSessionsActions'
import EmployeesTableRow from './EmployeesTableRow'
import EmployeesTable from './EmployeesTable'
import Calendar from '../calendar/Calendar'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const allYears = useSelector(state => state.planningSessions.years)
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
  ])

  const [selectedYear, setSelectedYear] = useState(2023)

  useEffect(() => {
    dispatch(getPlanningSessionsAllYears())
      .then(() => setSelectedYear(allYears[0]))
  }, [])

  const handleYearSelect = (e) => {
    setSelectedYear(e.target.value)
  }

  return (
    <div id="dashboardPage" className='h-100'>
      <div className="row h-100">
        <div className="col-4 h-100 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <p className="h3 mb-0 mx-4 lh-base text-right">Selectati anul</p>
            <select className="form-select year-form-select" onChange={handleYearSelect}>
              <option disabled>Alegeti Anul</option>
              {allYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))
              }
            </select>
          </div>
          <div className="mt-4 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary btn-md"
              >
              Vizualizati Planificari
            </button>
          </div>
          <div className="mt-4 d-flex justify-content-center">
            <EmployeesTable employees={employees} />
          </div>
        </div>
        <div className="col-8 h-100 d-flex flex-column">
            <Calendar year={selectedYear} />
        </div>
      </div>
    </div>
  )
}

export default adminLayout(DashboardPage)
