import { createSlice } from '@reduxjs/toolkit'
import { updateUser } from './usersActions'

const initialState = {
  isLoading: false,
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    // Update user
    [updateUser.pending]: (state, _) => {
      state.isLoading = true
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.isLoading = false
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    }
  }
})

export default usersSlice.reducer
