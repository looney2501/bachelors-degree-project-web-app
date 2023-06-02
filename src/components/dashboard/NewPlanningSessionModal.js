import ModalComponent from '../ModalComponent'
import React, { useMemo, useState } from 'react'
import RestrictionIntervalPicker from '../calendar/RestrictionIntervalPicker'
import moment from 'moment'

const NewPlanningSessionModal = (props) => {
  const [availableFreeDays, setAvailableFreeDays] = useState(0)
  const [restrictionIntervals, setRestrictionIntervals] = useState([{
    startDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
    endDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
    availableOverlappingPlannings: 0
  }])

  const modalContent = () => {
    return (
      <form>
        <div className="mb-3">
          <label htmlFor="freeDaysNumberInput" className="form-label">Zile de concediu</label>
          <input type="number" className="form-control" id="freeDaysNumberInput" aria-describedby="freeDaysNumberHelp"
                 value={availableFreeDays} onChange={(e) => setAvailableFreeDays(e.target.value)}/>
          <div id="freeDaysNumberHelp" className="form-text">Introduceți numărul de zile de concediu disponibile anul următor</div>
        </div>

        <div className="mb-3">
          <label htmlFor="freeDaysNumberInput" className="form-label">Intervale de restricție</label>
          <RestrictionIntervalPicker intervals={restrictionIntervals} setIntervals={setRestrictionIntervals} />
          <div id="freeDaysNumberHelp" className="form-text">Introduceți intervale de timp în care doar un anumit număr de angajați își pot luat concediu în același timp</div>
        </div>
      </form>
    )
  }

  const modalFooterContent = () => {
    return <>
      <div style={{ width: '100%' }}>
        <button className="btn btn-primary">Salvează</button>
      </div>
    </>
  }

  return (
    <ModalComponent
      {...props}
      dataBsBackdrop="static"
      title="Sesiune de planificari de concedii noua"
      content={modalContent()}
      footerContent={modalFooterContent()}
    />
  )
}

export default NewPlanningSessionModal
