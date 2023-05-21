import { createSlice } from '@reduxjs/toolkit'
import { getPlanningSessionsAllYears } from './planningSessionsActions'

const initialState = {
  isLoading: false,
  years: [],
  error: null,
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
  }
})

export default planningSessionsSlice.reducer
