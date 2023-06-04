import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'
import moment from 'moment/moment'
import StatusMessage from '../loading/StatusMessage'
import ModalComponent from './ModalComponent'
import PreferredIntervalsPicker from './PreferredIntervalsPicker'
import { createNewVacationRequest } from '../../redux/planningSessions/vacationRequestsActions'
import { getAvailableDaysUsedNo } from '../../utils/calendarUtils'

const NewVacationRequestModal = (props) => {
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.planningSessions.isLoading)
  const error = useSelector(state => state.planningSessions.error)
  const availableFreeDays = useSelector(state => state.planningSessions.planningSession?.availableFreeDays)
  const nationalFreeDays = useSelector(state => state.planningSessions.planningSession?.nationalFreeDays)
  const planningSessionId = useSelector(state => state.planningSessions.planningSession?.id)

  const [preferredIntervals, setPreferredIntervals] = useState([{
    startDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
    endDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
    importanceLevel: 3
  }])
  const [clicked, setClicked] = useState(false)
  const [usedDays, setUsedDays] = useState(0)

  const handleSaveNewPlanningSession = () => {
    setClicked(true)
    dispatch(createNewVacationRequest({
      planningSessionId,
      preferredIntervals
    }))
  }

  const handleSetPreferredIntervals = (intervals) => {
    let usedDays = 0
    intervals.forEach(i => {
      const startMoment = moment(i.startDate)
      const endMoment = moment(i.endDate)
      usedDays += getAvailableDaysUsedNo(startMoment, endMoment, nationalFreeDays)
    })
    setUsedDays(usedDays)
    setPreferredIntervals(intervals)
  }

  const modalContent = () => {
    return (
      <form>
        <div className="mb-3">
          <label htmlFor="freeDaysNumberInput" className="form-label">Intervale de preferințe</label>
          <PreferredIntervalsPicker intervals={preferredIntervals} setIntervals={handleSetPreferredIntervals}/>
          <div id="freeDaysNumberHelp" className="form-text">
            Introduceți intervale de timp în care preferați să aveți zile libere. Aceste intervale nu se referă strict
            la zilele de concediu, ci la preferințele dumneavoastră în legătură cu zilele în care doriți să fiți liber.
          </div>
          <div id="freeDaysNumberHelp" className="form-text mt-2">
            Zile libere rămase: {availableFreeDays && nationalFreeDays && availableFreeDays - usedDays}
          </div>
        </div>
      </form>
    )
  }

  const modalFooterContent = () => {
    return <>
      <div className="w-100 d-flex justify-content-between">
        <button type="submit" className="btn btn-primary" onClick={handleSaveNewPlanningSession}>Salvează</button>
        {clicked && (
          <StatusMessage isLoading={isLoading} error={error}/>
        )}
      </div>
    </>
  }

  return (
    <ModalComponent
      {...props}
      dataBsBackdrop="static"
      title="Cerere de planificare de concedii nouă"
      content={modalContent()}
      footerContent={modalFooterContent()}
    />
  )
}

export default NewVacationRequestModal
