import React, { useState } from 'react'
import '../styles/userOrArtist.css'
import { CSSTransition } from 'react-transition-group'
import LoginPage from './LoginPage'
import ArtistLogin from '../../Artists/pages/ArtistLogin'

function UserOrArtist() {

    const [user,setUser]=useState(false)
    const [artist,setArtist]=useState(false)

    const userRedirector=() => {
        setUser(true)
    }
    const artistRedirector=() => {
        setArtist(true)
    }
    const closeLogin = () => {
        setUser(false)
        setArtist(false)
    }
  return (
    <div className="userOrArtist center">
      {!user && !artist && (
        <div className="userOrArtist-btns">
          <h1 className="userOrArtist-heading">Grab Arts</h1>
          <label className="mt-3 userOrArtist-label">
            to purchase art work
          </label>
          <button onClick={userRedirector} className="userOrArtist-each-btn">
            Sign In As User
          </button>
          <label className="mt-3 userOrArtist-label">
            if you are an Artist
          </label>
          <button onClick={artistRedirector} className="userOrArtist-each-btn">
            Sign In As Artist
          </button>
        </div>
      )}
      <CSSTransition
        in={user}
        timeout={400}
        classNames={"slideInFromRight"}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <i onClick={closeLogin} className="bx bxs-left-arrow userOrArtist-back-btn ">
            {" "}
            back
          </i>
          <LoginPage />
        </div>
      </CSSTransition>
      <CSSTransition
        in={artist}
        timeout={400}
        classNames={"slideInFromRight"}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <i onClick={closeLogin} className="bx bxs-left-arrow Artist-back-btn ">
            {" "}
            back
          </i>
          <ArtistLogin />
        </div>
      </CSSTransition>
    </div>
  )
}

export default UserOrArtist
