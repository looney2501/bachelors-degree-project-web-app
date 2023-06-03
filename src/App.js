import 'font-awesome/css/font-awesome.min.css'
import './assets/css/app.css'
import ManagerDashboardPage from './components/dashboard/manager/ManagerDashboardPage'
import TypographyPage from './components/TypographyPage'
import LoginPage from './components/auth/LoginPage'
import ProfilePage from './components/profile/ProfilePage'
import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EmployeeDashboardPage from './components/dashboard/employee/EmployeeDashboardPage'

const PrivateRoute = () => {
  const { currentUser } = useSelector(state => state.auth)

  return currentUser ? <Outlet /> : <Navigate replace to='/login' />
}

function App() {
  const { currentUser } = useSelector(state => state.auth)

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route exact path="/login" element={<LoginPage />}/>

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={currentUser.type === 'Manager' ? <ManagerDashboardPage /> : <EmployeeDashboardPage />}/>
          <Route exact path="/profile" element={<ProfilePage />}/>
          <Route exact path="/blank-page" element={<TypographyPage />}/>
        </Route>

        <Route exact path="/typography" element={<TypographyPage />}/>
      </Routes>
    </Router>
  )
}

export default App
