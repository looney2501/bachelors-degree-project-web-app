import { createSlice } from '@reduxjs/toolkit'
import {
  createNewPlanningSession,
  getPlanningSessionAllVacationsByYear,
  getPlanningSessionsAllYears
} from './planningSessionsActions'

const initialState = {
  isLoading: false,
  years: [],
  error: null,
  planningSession: null,
  isGenerated: false,
}

const planningSessionsSlice = createSlice({
  name: 'planningSessions',
  initialState,
  reducers: {},
  extraReducers: {
    // Get all years
    [getPlanningSessionsAllYears.fulfilled]: (state, { payload }) => {
      state.years = payload.years
    },
    [getPlanningSessionsAllYears.rejected]: (state, { payload }) => {
      state.error = payload
    },

    // Get all vacations by year
    [getPlanningSessionAllVacationsByYear.fulfilled]: (state, { payload }) => {
      state.planningSession = payload.planningSession
      state.isGenerated = payload.planningSession.vacations.length > 0
    },

    // Create new planning session
    [createNewPlanningSession.pending]: (state, _) => {
      state.isLoading = true
    },
    [createNewPlanningSession.fulfilled]: (state, _) => {
      state.isLoading = false
      state.error = null
    },
    [createNewPlanningSession.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  }
})

export default planningSessionsSlice.reducer
