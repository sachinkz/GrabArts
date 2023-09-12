import React, { useCallback, useContext, useEffect, useState } from "react"
import Allworks from "../components/WorksPage/Allworks"
import { AuthContext } from "../../shared/contexts/AuthContext"
import axios from "axios"
import Sidebar from "../components/ArtistHome/Sidebar"



function MyWorks() {
  const [works, setWorks] = useState(null)
  const [accWorks, setAccWorks] = useState(null)
  const auth = useContext(AuthContext)

    const getAllWorks = useCallback(() => {
      console.log(auth.artistData.artistId)
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          `/artists/works/${auth.artistData.artistId}`,
        {
          headers: { Authorization: auth.artistData.token },
        }
      )
      .then((res) => {
        console.log(res.data.accWorks)
        setWorks(res.data.works)
        setAccWorks(res.data.accWorks)
      })
  }, [auth])

  useEffect(() => {
    getAllWorks()
  }, [getAllWorks])

  return (
    <React.Fragment>
      <Sidebar />
      {works && <Allworks accWorks={accWorks} works={works} />}
    </React.Fragment>
  )
}

export default MyWorks
