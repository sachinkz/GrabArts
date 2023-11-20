import React, { useEffect, useState } from "react"

import ArtistItems from "./ArtistItems"
import "../../styles/TopArtists.css"
import axios from 'axios'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'


const TopArtists = () => {
  const [topten, setTopten] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  

  useEffect(() => {
  
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/users/top-artists")
      .then((res) => {
        setTopten(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
},[])

  return (
    <React.Fragment>
      <div className="total-topartist-container">
        {isLoading && !error && <LoadingSpinner asOverlay />}
        {error && <p style={{ color: "white" }}>{error} :| </p>}
        <ul className="users-list">
          {topten &&
            topten.map(
              (user, i) =>
                user.isVerified && (
                  <ArtistItems
                    key={i}
                    artistId={user._id}
                    image={user.image}
                    fname={user.fname}
                    lname={user.lname}
                    error={error}
                    lowestPricing={user.lowestPricing}
                    highestPricing={user.highestPricing}
                    rating={user.rating}
                    works={user.posts}
                  />
                )
            )}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default TopArtists;