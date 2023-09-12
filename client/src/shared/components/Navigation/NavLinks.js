import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { AuthContext } from '../../contexts/AuthContext'
import Modal from '../UIElements/Modal'
import Button from '../UIElements/Button'
import './NavLinks.css'

function NavLinks() {

  const auth = useContext(AuthContext)
  const history = useHistory()
  
  const [alert, setAlert] = useState(false)

  const openAlert = () => {
    if (auth.userData)
    {
      setAlert(true)
    } else
    {
      history.push("/artist-auth")
    }
  }
  const closeAlert = () => {
    setAlert(false)
  }
  const toArtistLogin = () => {
    auth.userLogOut()
   history.push('/artist-auth')
  }
    
    
  ;


  return (
    <React.Fragment>
      <Modal
        show={alert}
        onCancel={closeAlert}
        header={"Log out?"}
        footer={
          <div>
            <Button onClick={closeAlert} normal>
              CLOSE
            </Button>
            <Button onClick={toArtistLogin} normal>
              Log Out
            </Button>
          </div>
        }
      >
        <p>this will log you out ,are you sure?</p>
      </Modal>

      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        {auth.userData && (
          <li>
            <NavLink to="/order-history">My Orders</NavLink>
          </li>
        )}
        <li onClick={openAlert}>
          <h5 className="becomeanartist">Become An Artist</h5>
        </li>
        <li>
          <NavLink to="/about">About us</NavLink>
        </li>
        <li>
          {auth.userData ? (
            <h5 className="loggedinusername" onClick={auth.userLogOut}>
              {auth.userData.fname}
            </h5>
          ) : (
            <NavLink to="/auth">Login</NavLink>
          )}
        </li>
      </ul>
    </React.Fragment>
  )
}

export default NavLinks
