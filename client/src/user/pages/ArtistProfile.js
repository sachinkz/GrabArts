import React, { useContext, useState,useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ArtistProfileDetails from '../components/ArtistProfile/ArtistProfileDetails'
import ArtistReviews from '../components/ArtistProfile/ArtistReviews'
import PostDisplay from "../components/ArtistProfile/PostDisplay"
import MainNavigation from '../../shared/components/Navigation/MainNavigation'
import axios from 'axios'
import { AuthContext } from '../../shared/contexts/AuthContext'

function ArtistProfile() {
  const [loadedProfile, setLoadedProfile] = useState()
  const [loadedPricing, setLoadedPricing] = useState()
  const auth=useContext(AuthContext)

  const id = useParams().artistId
  
  const getArtistProfile = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/users/artistprofile/${id}`, {
        headers: { Authorization: auth.userData.token },
      })
      .then((res) => {
        console.log(res.data)
        setLoadedProfile(res.data.artistDetails)
        setLoadedPricing(res.data.artistPricing)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [auth, id])

   useEffect(() => {
     getArtistProfile()
   }, [getArtistProfile])
  
 
  return (
    <React.Fragment>
      <MainNavigation />
      <ArtistProfileDetails profile={loadedProfile} pricing={loadedPricing} />
      <h2 style={{ color: "white", textAlign: "center" }}>works</h2>
      <PostDisplay profile={loadedProfile} />
      <ArtistReviews profile={loadedProfile} />
    </React.Fragment>
  )
}

export default ArtistProfile

