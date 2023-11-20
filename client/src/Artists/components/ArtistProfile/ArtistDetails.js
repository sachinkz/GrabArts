import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import "../../styles/ArtistDetails.css"
import { AuthContext } from '../../../shared/contexts/AuthContext'
import axios from 'axios'

function ArtistDetails({ profile,getProfile }) {

  const auth=useContext(AuthContext)
  const history=useHistory()
  const artistId = auth.artistData.artistId


  const followArtist = (e, id) => {
    e.preventDefault()
    axios
      .get(process.env.REACT_APP_BACKEND_URL+`/artists/follow/${id}`, {
        headers: { Authorization: auth.artistData.token },
      })
      .then((res) => {
        getProfile()
      })
  }

  const goToMessage = () => {

    if (profile._id !== artistId)
    {
      const newConvo = {
        senderId: artistId,
        receiverId: profile._id,
      }
      axios.post(process.env.REACT_APP_BACKEND_URL+"/message", newConvo).then((res) => {
        console.log(res)
      history.push('/messages')
      })
    }
  }
  const gotToVerify = () => {
    history.push('/verify-account')
  }
  
  return (
    <div className="profile-top">
      <div class="profile-picture">
        <img src={profile && profile.image} alt="Profile" />
      </div>
      <div className="profile-details">
        <h1>{profile && profile.fname + " " + profile.lname}</h1>
        <div className="follow-info">
          <div className="followers">
            <span>{profile && profile.followers.length}</span>
            <strong>Followers</strong>
          </div>
          <div className="following">
            <span>{profile && profile.following.length}</span>
            <strong>Following</strong>
          </div>
        </div>
        <p className="bio">A short bio about the user...</p>

        {profile && profile._id !== artistId ? (
          <div className="aProfile-all-buttons">
            <div>
              <button  onClick={(e) => followArtist(e, profile._id)} className="aProfile-follow-button">{profile && profile.followers.includes(auth.artistData.artistId)?'Following':'Follow'}</button>
            </div>
            <div>
              <button onClick={goToMessage} className="aProfile-follow-button">
                message
              </button>
            </div>
          </div>
        ) : (
          <div className="aProfile-all-buttons">
            {profile && !profile.isVerified && (
              <div>
                <button
                  onClick={gotToVerify}
                  className="aProfile-follow-button"
                >
                  Verify account
                </button>
              </div>
            )}

            <div>
              <button className="aProfile-follow-button">
                <i className="bx bx-cog"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtistDetails



