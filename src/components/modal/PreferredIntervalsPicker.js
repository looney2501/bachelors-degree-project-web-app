import moment from 'moment/moment'

const PreferredIntervalsPicker = ({ intervals, setIntervals }) => {
  const handleDateChange = (e, i, type) => {
    setIntervals([
      ...intervals.slice(0, i), // Copy elements before the updated object
      {
        ...intervals[i], // Copy the object at index i
        [type]: e.target.value, // Update the startDate attribute
      },
      ...intervals.slice(i + 1), // Copy elements after the updated object
    ])
  }

  const handleImportanceLevelChange = (e, i) => {
    setIntervals([
      ...intervals.slice(0, i), // Copy elements before the updated object
      {
        ...intervals[i], // Copy the object at index i
        importanceLevel: e.target.value,
      },
      ...intervals.slice(i + 1), // Copy elements after the updated object
    ])
  }

  const handleAddPreferredInterval = () => {
    setIntervals([
      ...intervals,
      {
        startDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
        endDate: moment().add(1, 'year').startOf('year').format('YYYY-MM-DD'),
        availableOverlappingPlannings: 0
      }
    ])
  }

  const handleRemoveRestrictionInterval = () => {
    setIntervals(intervals.slice(0, -1))
  }

  return (
    <>
      {intervals.map((interval, i) => {
        return (
          <div key={i} className="row mb-3">
            <div className="col-6">
              <label className="form-label form-label-small">Dată început</label>
              <input className="form-control" type="date" value={interval.startDate}
                     onChange={e => handleDateChange(e, i, 'startDate')}/>
            </div>
            <div className="col-5">
              <label className="form-label form-label-small">Dată final</label>
              <input className="form-control" type="date" value={interval.endDate}
                     onChange={e => handleDateChange(e, i, 'endDate')}/>
            </div>
            {i === intervals.length - 1 && (
              <div className="col-1 d-flex flex-column align-items-end justify-content-end">
                <button type="button" className="btn-close" onClick={() => handleRemoveRestrictionInterval()}/>
              </div>
            )}
            <div className="col-11">
              <label className="form-label form-label-small">Importanță</label>
              <input type="range" className="form-range" min={1} max={5} step={1} value={interval.importanceLevel}
              onChange={e => handleImportanceLevelChange(e, i)}/>
            </div>
            {i === intervals.length - 1 && (
              <div className="col-1 d-flex flex-column align-items-end justify-content-center">
                <button id="addPreferredIntervalButton" type="button" className="btn-add" onClick={() => handleAddPreferredInterval()}/>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export default PreferredIntervalsPicker
