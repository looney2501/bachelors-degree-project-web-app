import ModalComponent from './ModalComponent'
import React, { useEffect, useMemo, useState } from 'react'
import RestrictionIntervalsPicker from './RestrictionIntervalsPicker'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPlanningSession } from '../../redux/planningSessions/planningSessionsActions'
import StatusMessage from '../loading/StatusMessage'
import statusMessage from '../loading/StatusMessage'

const NewPlanningSessionModal = (props) => {
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.planningSessions.isLoading)
  const error = useSelector(state => state.planningSessions.error)

  const [availableFreeDays, setAvailableFreeDays] = useState(0)
  const [restrictionIntervals, setRestrictionIntervals] = useState([{
    startDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
    endDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
    availableOverlappingPlannings: 0
  }])
  const [clicked, setClicked] = useState(false)

  const handleSaveNewPlanningSession = () => {
    setClicked(true)
    dispatch(createNewPlanningSession({
      year: moment().add(1, 'year').year(),
      availableFreeDays,
      restrictionIntervals
    }))
  }

  const modalContent = () => {
    return (
      <form>
        <div className="mb-3">
          <label htmlFor="freeDaysNumberInput" className="form-label">Zile de concediu</label>
          <input type="number" className="form-control" id="freeDaysNumberInput" aria-describedby="freeDaysNumberHelp"
                 value={availableFreeDays} onChange={(e) => setAvailableFreeDays(e.target.value)}/>
          <div id="freeDaysNumberHelp" className="form-text">Introduceți numărul de zile de concediu disponibile anul
            următor
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="freeDaysNumberInput" className="form-label">Intervale de restricție</label>
          <RestrictionIntervalsPicker intervals={restrictionIntervals} setIntervals={setRestrictionIntervals}/>
          <div id="freeDaysNumberHelp" className="form-text">Introduceți intervale de timp în care doar un anumit număr
            de angajați își pot luat concediu în același timp
          </div>
        </div>
      </form>
    )
  }

  const modalFooterContent = () => {
    return <>
      <div className="w-100 d-flex justify-content-between">
        <button id="createPlanningSessionButton" type="submit" className="btn btn-primary" onClick={handleSaveNewPlanningSession}>Salvează</button>
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
      title="Sesiune de planificări de concedii nouă"
      content={modalContent()}
      footerContent={modalFooterContent()}
    />
  )
}

export default NewPlanningSessionModal
