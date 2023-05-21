import React, { useState } from 'react'
import '../../assets/css/login.css'
import authLayout from '../authLayout'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/auth/authActions'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({ email: '', password: '' })

  const handeInputChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value

    setLoginData({
      ...loginData,
      [inputName]: inputValue
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    dispatch(signIn(loginData))
      .then(() => navigate('/'))
  }

  return (
    <>
      <form className="login-form">
        <div className="d-flex align-items-center my-4">
          <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
        </div>
        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">Email address</label>
          <input
            type="email"
            id="form3Example3"
            name="email"
            className="form-control form-control-lg"
            placeholder="Enter a valid email address"
            value={loginData.email}
            onChange={handeInputChange}
          />
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="form3Example4">Password</label>
          <input
            type="password"
            id="form3Example4"
            name="password"
            className="form-control form-control-lg"
            placeholder="Enter password"
            value={loginData.password}
            onChange={handeInputChange}
          />
        </div>

        {/*<div className="d-flex justify-content-between align-items-center">*/}
        {/*  /!* <!-- Checkbox --> *!/*/}
        {/*  <div className="form-check mb-0">*/}
        {/*    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3"/>*/}
        {/*    <label className="form-check-label" htmlFor="form2Example3">*/}
        {/*      Remember me*/}
        {/*    </label>*/}
        {/*  </div>*/}
        {/*  <Link to="/reset-password" className="text-body">Forgot password?</Link>*/}
        {/*</div>*/}

        <div className="text-center text-lg-start mt-4 mb-3 pt-2">
          <button type="submit" onClick={handleLogin} className="btn btn-primary btn-lg">Login</button>
          {/*<p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"*/}
          {/*                                                                      className="link-danger">Register</a></p>*/}
        </div>
      </form>
    </>
  )
}

export default authLayout(LoginPage)
