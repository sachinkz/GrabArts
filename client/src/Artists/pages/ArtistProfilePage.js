import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ArtistDetails from '../components/ArtistProfile/ArtistDetails'
import PostDisplay from '../components/ArtistProfile/PostDisplay'
import Sidebar from '../components/ArtistHome/Sidebar'
import axios from 'axios'
import { AuthContext } from '../../shared/contexts/AuthContext'
import '../styles/ArtistProfile.css'
function ArtistProfilePage() {

  const [loadedProfile, setLoadedProfile] = useState();

  const auth = useContext(AuthContext)

  const id = useParams().artistId

  const getArtistProfile = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/artists/profile/${id}`, {
        headers: { Authorization: auth.artistData.token },
      })
      .then((res) => {
        setLoadedProfile(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [auth,id])
  
  
  useEffect(() => {
    getArtistProfile()
  },[getArtistProfile])
  
  return (
    <React.Fragment>
      <div className="aProfile-main-div">
        <Sidebar />
        <ArtistDetails profile={loadedProfile} />
        <PostDisplay profile={loadedProfile} />
      </div>
    </React.Fragment>
  )
}

export default ArtistProfilePage

