import 'font-awesome/css/font-awesome.min.css'
import './assets/css/app.css'
import DashboardPage from './components/managerDashboard/ManagerDashboardPage'
import TypographyPage from './components/TypographyPage'
import LoginPage from './components/auth/LoginPage'
import ResetPassword from './components/auth/ResetPassword'
import ProfilePage from './components/profile/ProfilePage'
import ChangePasswordPage from './components/profile/ChangePasswordPage'
import UserPreferencesPage from './components/profile/UserPreferencesPage'
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { currentUser } = useSelector(state => state.auth)

  return currentUser ? <Outlet /> : <Navigate replace to='/login' />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route exact path="/login" element={<LoginPage />}/>
        <Route exact path="/reset-password" element={<ResetPassword />}/>

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<DashboardPage />}/>
          <Route exact path="/profile" element={<ProfilePage />}/>
          <Route exact path="/preferences" element={<UserPreferencesPage />}/>
          <Route exact path="/blank-page" element={<TypographyPage />}/>
          <Route exact path="/change-password" element={<ChangePasswordPage />}/>
        </Route>

        <Route exact path="/typography" element={<TypographyPage />}/>
      </Routes>
    </Router>
  )
}

export default App
