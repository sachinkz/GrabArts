import React, { useContext, useEffect, useState } from "react"
import PricingMain from "../components/Verification/PricingMain"
import ArtistAddress from "../components/Verification/ArtistAddress"
import { AuthContext } from '../../shared/contexts/AuthContext'
import axios from 'axios'

function ArtistVerification() {
  const [pricing, setPricing] = useState()
  const [artistAddress, setArtistAddress] = useState()
  const auth=useContext(AuthContext)


  useEffect(() => {
    if (pricing, artistAddress)
    {
      const datas = {
        pricing,
        artistAddress,
      }
      console.log(datas)
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/artists/verification",
          datas,
          {
            headers: { Authorization: auth.artistData.token },
          }
        )
        .then((res) => console.log(res.data))
    }
  },[pricing,artistAddress,auth])

  const getPricing = (prices) => {
    setPricing(prices)
  }
  const getartistAddress = (address) => {
    setArtistAddress(address)
  }


  return (
    <div>
      {!pricing ? (
        <PricingMain getPricing={getPricing} />
      ) : (
        <ArtistAddress
          getartistAddress={getartistAddress}
        />
      )}
    </div>
  )
}

export default ArtistVerification
