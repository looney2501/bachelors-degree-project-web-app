import moment from 'moment'

const RestrictionIntervalsPicker = ({ intervals, setIntervals }) => {
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

  const handleRestrictionNumberChange = (e, i) => {
    setIntervals([
      ...intervals.slice(0, i), // Copy elements before the updated object
      {
        ...intervals[i], // Copy the object at index i
        availableOverlappingPlannings: e.target.value,
      },
      ...intervals.slice(i + 1), // Copy elements after the updated object
    ])
  }

  const handleAddRestrictionInterval = () => {
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
            <div className="col-4">
              <label className="form-label form-label-small">Dată început</label>
              <input id="startDateInput" className="form-control" type="date" value={interval.startDate}
                     onChange={e => handleDateChange(e, i, 'startDate')}/>
            </div>
            <div className="col-4">
              <label className="form-label form-label-small">Dată final</label>
              <input id="endDateInput" className="form-control" type="date" value={interval.endDate}
                     onChange={e => handleDateChange(e, i, 'endDate')}/>
            </div>
            <div className="col-3">
              <label className="form-label form-label-small">Max concedii</label>
              <input id="availableOverlappingPlanningsInput" className="form-control" type="number" value={interval.availableOverlappingPlannings}
                     onChange={e => handleRestrictionNumberChange(e, i)}/>
            </div>
            {i === intervals.length-1 && (
              <div className="col-1 d-flex flex-column align-items-end justify-content-around">
                <button type="button" className="btn-close" onClick={() => handleRemoveRestrictionInterval()}/>
                <button id="addRestrictionIntervalButton" type="button" className="btn-add" onClick={() => handleAddRestrictionInterval()}/>
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export default RestrictionIntervalsPicker
