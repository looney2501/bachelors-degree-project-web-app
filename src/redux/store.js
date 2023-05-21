import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import { reduxTokenAuthReducer } from 'redux-token-auth'

const store = configureStore({
  reducer: {
    currentUser: reduxTokenAuthReducer,
  }
})

export default store;
