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
        `${baseUrl}/all_vacations_by_year`,
        {
          params: { year: year }
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
