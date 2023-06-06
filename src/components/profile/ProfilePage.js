import React, { useEffect, useState } from 'react'
import '../../assets/css/profile.css'
import dashboardLayout from '../layout/dashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/users/usersActions'
import { current } from '@reduxjs/toolkit'

const ProfilePage = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.currentUser)
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: ''
  })

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      })
    }
  }, [user])

  const handleOnChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value

    setUserData({
      ...userData,
      [inputName]: inputValue
    })
  }

  const handleSaveUser = (e) => {
    e.preventDefault()

    dispatch(updateUser({ ...userData, id: user.id }))
  }

  return (
    <div className="container">
      <div className="row profile">
        <div className="col-md-3">
          <div className="profile-sidebar">
            <div className="my-3 p-3 bg-body rounded shadow-sm">

              {/* <!-- SIDEBAR USERPIC --> */}
              <div className="profile-userpic">
                <img src="https://via.placeholder.com/150" className="img-responsive profile-img-center" alt=""/>
              </div>
              {/* <!-- END SIDEBAR USERPIC -->
                            <!-- SIDEBAR USER TITLE --> */}
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="profile-usertitle-email">
                  {user?.email}
                </div>
                <div className="profile-usertitle-job">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="profile-content">
            <div className="my-3 p-3 bg-body rounded shadow-sm">
              <h6 className="border-bottom pb-2 mb-0 mb-3 text-default">Informații user</h6>
              <form onSubmit={handleSaveUser}>
                <div className="row">
                  <div className="col">
                    <label htmlFor="firstNameInput" className="form-label">Prenume</label>
                    <div className="input-group mb-3">
                      <input id="firstNameInput" type="text" className="form-control" placeholder="Prenume"
                             aria-describedby="basic-addon2" name='firstName' value={userData.firstName} onChange={handleOnChange}/>
                      <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="lastNameInput" className="form-label">Nume</label>
                    <div className="input-group mb-3">
                      <input id="lastNameInput" type="text" className="form-control" placeholder="Nume"
                             aria-describedby="basic-addon2" name='lastName' value={userData.lastName} onChange={handleOnChange}/>
                      <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i></span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label htmlFor="phoneNumberInput" className="form-label">Telefon</label>
                    <div className="input-group mb-3">
                      <input id="phoneNumberInput" type="text" className="form-control" placeholder="Telefon"
                             aria-describedby="basic-addon2" name='phoneNumber' value={userData.phoneNumber} onChange={handleOnChange}/>
                      <span className="input-group-text" id="basic-addon2"><i className="fa fa-mobile"></i></span>
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="roleInput" className="form-label">Rol Departament</label>
                    <div className="input-group mb-3">
                      <input id="roleInput" type="text" className="form-control" placeholder="Rol Departament"
                             aria-describedby="basic-addon2" name='role' value={userData.role} onChange={handleOnChange}/>
                      <span className="input-group-text" id="basic-addon2"><i className="fa fa-user"></i> </span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Salvează</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default dashboardLayout(ProfilePage)
