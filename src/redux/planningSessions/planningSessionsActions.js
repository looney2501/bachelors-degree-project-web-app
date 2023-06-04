import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

const baseUrl = '/planning_sessions'

export const getPlanningSessionsAllYears = createAsyncThunk(
  'planningSessions/getAllYears',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        baseUrl,
        { params: { mode: 'years' } }
      )

      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getPlanningSessionAllVacationsByYear = createAsyncThunk(
  'planningSessions/getAllVacationsByYear',
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        baseUrl,
        {
          params: {
            mode: 'by_year_all_vacations',
            year: year
          }
        }
      )

      return data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getPlanningSessionThinByYear = createAsyncThunk(
  'planningSessions/getPlanningSessionThinByYear',
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        baseUrl,
        {
          params: {
            mode: 'by_year_thin_details',
            year: year
          }
        }
      )

      return data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const createNewPlanningSession = createAsyncThunk(
  'planningSessions/createNewPlanningSession',
  async ({ year, availableFreeDays, restrictionIntervals }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        baseUrl,
        {
          year,
          availableFreeDays,
          restrictionIntervals
        }
      )

      return data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const generateVacationsSchedule = createAsyncThunk(
  'planningSessions/generateVacationSchedule',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id)
      const { data } = await axiosInstance.post(
        `${baseUrl}/${id}/generate_vacations_schedule`
      )

      return data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
