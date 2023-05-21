import React, { useEffect, useState } from 'react'
import adminLayout from './adminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getPlanningSessionsAllYears } from '../redux/planningSessions/planningSessionsActions'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const allYears = useSelector(state => state.planningSessions.years)

  const [selectedYear, setSelectedYear] = useState()

  useEffect(() => {
    dispatch(getPlanningSessionsAllYears())
      .then(() => setSelectedYear(allYears[0]))
  }, [])

  const handleYearSelect = (e) => {
    setSelectedYear(e.target.value)
  }

  return (
    <>
      <div className="row h-25">
        <div className="col-6 h-100 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-end">
            <p className="h3 w-50 mb-0 mx-4 lh-base text-right">Selectati anul</p>
            <select className="form-select w-50" onChange={handleYearSelect}>
              <option disabled>Alegeti Anul</option>
              {allYears.map(y => (
                <option key={y} value={y}>{y}</option>
              ))
              }
            </select>
          </div>
        </div>
        <div className="col-6">
        </div>
      </div>

      <div className="row">
        {/*  <div className="col-xl-3 col-sm-6 mb-3">*/}
        {/*    <div className="card text-white bg-primary o-hidden h-100">*/}
        {/*      <div className="card-body">*/}
        {/*        <div className="card-body-icon">*/}
        {/*          <i className="fa fa-fw fa-comments"></i>*/}
        {/*        </div>*/}
        {/*        <div className="mr-5">26 New Messages!</div>*/}
        {/*      </div>*/}
        {/*      <a className="card-footer text-white clearfix small z-1" href="#">*/}
        {/*        <span className="float-left">View Details</span>*/}
        {/*        <span className="float-right">*/}
        {/*          <i className="fa fa-angle-right"></i>*/}
        {/*        </span>*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="col-xl-3 col-sm-6 mb-3">*/}
        {/*    <div className="card text-white bg-warning o-hidden h-100">*/}
        {/*      <div className="card-body">*/}
        {/*        <div className="card-body-icon">*/}
        {/*          <i className="fa fa-fw fa-list"></i>*/}
        {/*        </div>*/}
        {/*        <div className="mr-5">11 New Tasks!</div>*/}
        {/*      </div>*/}
        {/*      <a className="card-footer text-white clearfix small z-1" href="#">*/}
        {/*        <span className="float-left">View Details</span>*/}
        {/*        <span className="float-right">*/}
        {/*          <i className="fa fa-angle-right"></i>*/}
        {/*        </span>*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="col-xl-3 col-sm-6 mb-3">*/}
        {/*    <div className="card text-white bg-success o-hidden h-100">*/}
        {/*      <div className="card-body">*/}
        {/*        <div className="card-body-icon">*/}
        {/*          <i className="fa fa-fw fa-shopping-cart"></i>*/}
        {/*        </div>*/}
        {/*        <div className="mr-5">123 New Orders!</div>*/}
        {/*      </div>*/}
        {/*      <a className="card-footer text-white clearfix small z-1" href="#">*/}
        {/*        <span className="float-left">View Details</span>*/}
        {/*        <span className="float-right">*/}
        {/*          <i className="fa fa-angle-right"></i>*/}
        {/*        </span>*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="col-xl-3 col-sm-6 mb-3">*/}
        {/*    <div className="card text-white bg-danger o-hidden h-100">*/}
        {/*      <div className="card-body">*/}
        {/*        <div className="card-body-icon">*/}
        {/*          <i className="fa fa-fw fa-support"></i>*/}
        {/*        </div>*/}
        {/*        <div className="mr-5">13 New Tickets!</div>*/}
        {/*      </div>*/}
        {/*      <a className="card-footer text-white clearfix small z-1" href="#">*/}
        {/*        <span className="float-left">View Details</span>*/}
        {/*        <span className="float-right">*/}
        {/*          <i className="fa fa-angle-right"></i>*/}
        {/*        </span>*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
      </div>
    </>
  )
}

export default adminLayout(DashboardPage)
