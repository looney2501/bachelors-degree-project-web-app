import React, { useState } from 'react'
import '../../assets/css/login.css'
import authLayout from '../layout/authLayout'
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
          <h1 className="text-center fw-normal mb-0 me-3">Autentificare</h1>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3">Email</label>
          <input
            type="email"
            id="form3Example3"
            name="email"
            className="form-control form-control-lg"
            placeholder="Adresa de email"
            value={loginData.email}
            onChange={handeInputChange}
          />
        </div>
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="form3Example4">Parolă</label>
          <input
            type="password"
            id="form3Example4"
            name="password"
            className="form-control form-control-lg"
            placeholder="Parola"
            value={loginData.password}
            onChange={handeInputChange}
          />
        </div>

        <div className="text-center text-lg-start mt-4 mb-3 pt-2">
          <button type="submit" onClick={handleLogin} className="btn btn-primary btn-lg">Login</button>
        </div>
      </form>
    </>
  )
}

export default authLayout(LoginPage)
