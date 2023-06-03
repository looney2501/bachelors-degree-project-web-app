import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

const baseUrl = '/vacation_requests'

export const createNewVacationRequest = createAsyncThunk(
  'planningSessions/createNewVacationRequest',
  async ({ planningSessionId, preferredIntervals }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        baseUrl,
        {
          planningSessionId,
          preferredIntervals
        }
      )
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
