import axiosInstance from '../../axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = '/users'

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(
        `${baseUrl}/${userData.id}`,
        userData
      )

      console.log(data)
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
