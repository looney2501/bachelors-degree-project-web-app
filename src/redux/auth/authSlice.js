import { createSlice } from '@reduxjs/toolkit'
import { signIn } from './authActions'

const initialState = {
  isLoading: false,
  currentUser: undefined,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Login
    [signIn.pending]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.currentUser = payload.data
    },
    [signIn.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

export default authSlice.reducer
