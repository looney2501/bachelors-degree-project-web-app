import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

const baseUrl = '/planning_sessions'

export const updateVacationPlannedDays = createAsyncThunk(
  'vacations/updatePlannedFreeDays',
  async ({ planningSessionId, userId, freeDays }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseUrl}/update_planned_free_days`,
        {
          planningSessionId,
          userId,
          freeDays
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
