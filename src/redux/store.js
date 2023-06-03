import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import planningSessionsReducer from './planningSessions/planningSessionsSlice'

const getPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('vacations_planner')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)['currentUser']
  } catch (err) {
    return undefined
  }
}

const selectState = () => {
  const persistedState = getPersistedState()

  return persistedState ? { auth: { currentUser: { ...persistedState } } } : undefined
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    planningSessions: planningSessionsReducer,
  },
  preloadedState: selectState()
})

export default store
