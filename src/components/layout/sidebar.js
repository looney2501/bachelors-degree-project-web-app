import React from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="border-end sidenav" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom ">
        <img className="logo-image" alt="Alt content" src={logo}/>
      </div>
      <PerfectScrollbar className="sidebar-items">
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <Link tag="a" className="" to="/">
              <i className="fa fa-calendar"></i> Planificator
            </Link>
          </li>
          <li className="mb-1">
            <Link tag="a" className="" to="/profile">
              <i className="fa fa-user-circle"></i> Profil
            </Link>
          </li>
          <li className="border-top my-3"></li>

        </ul>
      </PerfectScrollbar>
      <div className="dropdown fixed-bottom-dropdown">
        <a style={{ cursor: 'pointer' }} onClick={handleLogOut}><i className="fa fa-sign-out" aria-hidden="true"></i> Log out</a>
      </div>
    </div>
  )
}

export default Sidebar
