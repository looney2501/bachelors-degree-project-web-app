import axiosInstance from '../../axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = '/users'

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      for (const k in userData) {

        formData.append(k, userData[k])
      }
      if (!userData.avatar) {
        formData.delete('avatar')
      }

      const { data } = await axiosInstance.put(
        `${baseUrl}/${userData.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
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
