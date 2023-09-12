import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {

  const [tokenExpiryDate, setTokenExpiryDate] = useState()
  const [userData, setUserData] = useState()
  const [artistData, setArtistData] = useState()
  
  
  
  const userLogIn = useCallback((data) => {
    console.log(data)
      let expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)
      data.expiration = data.expiration || expirationDate.toISOString()
      setTokenExpiryDate(data.expiration)
      localStorage.setItem("userData", JSON.stringify(data))
      setUserData(data)
    }, [])

  const userLogOut = useCallback(() => {
      setUserData(null)
      setTokenExpiryDate(null)
    localStorage.removeItem("userData")
    }, [])

  
  
  
  
  
  const artistLogIn = useCallback((data) => {
      let expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60)
      data.expiration = data.expiration || expirationDate.toISOString()
      setTokenExpiryDate(data.expiration)
      localStorage.setItem("artistData", JSON.stringify(data))
      setArtistData(data)
    }, [])

    const artistLogOut = useCallback(() => {
      setArtistData(null)
      setTokenExpiryDate(null)
      localStorage.removeItem("artistData")
    }, [])

  
  
  
  
  
    useEffect(() => {
      const user = localStorage.getItem("userData")
      const artist = localStorage.getItem("artistData")

      if (artist && JSON.parse(artist)) {
        let data = JSON.parse(artist)
        if (new Date(data.expiration) > new Date()) {
          data.expiration = new Date(data.expiration)
          artistLogIn(data)
        } else {
          artistLogOut()
        }
      }

      if (user && JSON.parse(user))
      {
        let data = JSON.parse(user)
        if (new Date(data.expiration) > new Date())
        {
          data.expiration = new Date(data.expiration)
          userLogIn(data)
        } else
        {
          userLogOut()
        }
      }
    }, [artistLogIn, userLogIn, artistLogOut,userLogOut])

    useEffect(() => {
      if (artistData && tokenExpiryDate) {
        const remainingTime =
          new Date(tokenExpiryDate).getTime() - new Date().getTime()

        logoutTimer = setTimeout(artistLogOut, remainingTime)
      } else {
        clearTimeout(logoutTimer)
      }
    }, [artistData, artistLogOut, tokenExpiryDate])

    return {artistData,userData,artistLogIn,userLogIn,artistLogOut,userLogOut}
}
