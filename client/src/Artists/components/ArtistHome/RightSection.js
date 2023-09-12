import React, { useCallback, useContext, useEffect, useState } from "react"
import "../../styles/ArtistHome.css"
import axios from 'axios'
import { AuthContext } from "../../../shared/contexts/AuthContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const RightSection = (props) => {
  const [suggestions, setSuggestions] = useState()
  const auth = useContext(AuthContext)
  const history=useHistory()

  const toArtistProfile = (e, id) => {
    e.preventDefault()
    history.push(`/profile/${id}`)
  }


  const followArtist = (e, id) => {
    e.preventDefault()
    axios
      .get(process.env.REACT_APP_BACKEND_URL+`/artists/follow/${id}`, {
        headers: { Authorization: auth.artistData.token },
      })
      .then((res) => {
        console.log(res.data)
        getSuggestions()
      })
  }

  
  const getSuggestions = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/artists/suggestions", {
        headers: {
          Authorization: auth.artistData.token,
          "Content-Type": "application/json",
        },
      })
      .then((datas) => {
        console.log(datas.data)

        setSuggestions(datas.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },[auth])
  
  useEffect(() => {
    getSuggestions();
  }, [getSuggestions])
  

  return (
    <React.Fragment>
      {suggestions ? (
        <div className="aHome-suggestions">
          <div className="aHome-suggestions-box">
            <div className="aHome-suggestions-header">
              <h3>suggested for you</h3>
            </div>
            {suggestions.map((user) => (
              <div key={user._id} className="aHome-suggested-user">
                    <img
                      onClick={(e) => toArtistProfile(e, user._id)}
                      src={user.image}
                      alt="dp"
                    />
                    {user.isTopten && (
                      <i className="bx bxs-badge-check bx-tada bx-rotate-270"></i>
                    )}
                    <h3
                      onClick={(e) => toArtistProfile(e, user._id)}
                      className="aHome-user-name"
                    >
                      {user.fname + " " + user.lname}
                    </h3>

                    <div className="aHome-follow-btndiv">
                      <button
                        onClick={(e) => followArtist(e, user._id)}
                        className="aHome-follow-button"
                      >
                        Follow
                      </button>
                  </div>
              </div>
            ))}
          </div>

          <div className="aHome-footer">
            <div>
              <a className="aHome-footer-links" href="/artist">
                About
              </a>
              <a className="aHome-footer-links" href="/artist">
                Terms and conditions
              </a>
              <a className="aHome-footer-links" href="/artist">
                help
              </a>
              <a className="aHome-footer-links" href="/artist">
                Language
              </a>
              <h4 className="aHome-footer-copyrights">
                <i className="bx bx-copyright"></i>all rights reserved
                GrabArts@2023
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="center">something went wrong !!</div>
          <div className="aHome-footer">
            <div>
              <a className="aHome-footer-links" href="/artist">
                About
              </a>
              <a className="aHome-footer-links" href="/artist">
                Terms and conditions
              </a>
              <a className="aHome-footer-links" href="/artist">
                help
              </a>
              <a className="aHome-footer-links" href="/artist">
                Language
              </a>
              <h4 className="aHome-footer-copyrights">
                <i className="bx bx-copyright"></i>all rights reserved
                GrabArts@2023
              </h4>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default RightSection;
