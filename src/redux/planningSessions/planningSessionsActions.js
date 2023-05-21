import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

export const getPlanningSessionsAllYears = createAsyncThunk(
  'planningSessions/getAllYears',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        '/planning_sessions',
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
