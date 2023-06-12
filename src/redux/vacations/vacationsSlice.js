import { createSlice } from '@reduxjs/toolkit'
import { updateVacationPlannedDays } from './vacationActions'

const initialState = {
  error: null,
}

const vacationsSlice = createSlice({
  name: 'vacations',
  initialState,
  reducers: {},
  extraReducers: {
    // Update vacation days
    [updateVacationPlannedDays.fulfilled]: (state, { payload }) => {
      state.planningSession = payload.planningSession
      state.isGenerated = payload.planningSession.vacations.length > 0
      state.error = null
    },
    [updateVacationPlannedDays.rejected]: (state, { payload }) => {
      state.error = payload
    }
  }
})

export default vacationsSlice.reducer
