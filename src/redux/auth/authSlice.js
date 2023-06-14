import { createSlice } from '@reduxjs/toolkit'
import { signIn } from './authActions'
import { updateUser } from '../users/usersActions'

const initialState = {
  isLoading: false,
  currentUser: undefined,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
    }
  },
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
    // Update current user
    [updateUser.fulfilled]: (state, { payload }) => {
      if (state.currentUser.id === payload.user.id) {
        state.currentUser = payload.user
      }
    }
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
