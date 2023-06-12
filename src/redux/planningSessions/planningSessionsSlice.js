import { createSlice } from '@reduxjs/toolkit'
import {
  createNewPlanningSession, generateVacationsSchedule,
  getPlanningSessionAllVacationsByYear,
  getPlanningSessionsAllYears, getPlanningSessionThinByYear
} from './planningSessionsActions'
import { createNewVacationRequest } from './vacationRequestsActions'
import { updateVacationPlannedDays } from '../vacations/vacationActions'

const initialState = {
  isLoading: false,
  years: null,
  error: null,
  planningSession: null,
  isGenerated: false,
  hasRequested: true,
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

    // Get thin details by year
    [getPlanningSessionThinByYear.fulfilled]: (state, { payload }) => {
      state.planningSession = payload.planningSession
      state.hasRequested = payload.hasRequested
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
    [createNewPlanningSession.fulfilled]: (state, { payload }) => {
      console.log('plm')
      state.isLoading = false
      state.error = null
      state.years.push(payload.planningSession.year)
    },
    [createNewPlanningSession.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },

    // Create new vacation request
    [createNewVacationRequest.pending]: (state, _) => {
      state.isLoading = true
    },
    [createNewVacationRequest.fulfilled]: (state, _) => {
      state.isLoading = false
      state.error = null
      state.hasRequested = true
    },
    [createNewVacationRequest.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.hasRequested = false
    },

    // Generate vacations schedule
    [generateVacationsSchedule.pending]: (state, { _ }) => {
      state.isLoading = true
    },
    [generateVacationsSchedule.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.planningSession = payload.planningSession
      state.isGenerated = payload.planningSession.vacations.length > 0
    }
  }
})

export default planningSessionsSlice.reducer
