import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../axios'

export const signIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/auth/sign_in`,
        { email, password },
      )

      return { data }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
