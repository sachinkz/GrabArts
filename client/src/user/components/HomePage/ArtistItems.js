import React from "react"
import "../../styles/ArtistItems.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const ArtistItems = (props) => {

  const history=useHistory()
  const navigate = () => {
    history.push(`/${props.artistId}/profile`)
  }
  return (
    <React.Fragment>
      {props.error && (
        <div>
          <h3>{props.error}</h3>
        </div>
      )}

      <li
        onClick={navigate}
        className="artist-item"
      >
        <div className="artistItem-container">
          <img
            className="artist-item__image"
            src={props.image && props.image}
            alt={props.fname}
          />
          <div className="artist-item__info">
            <h2>
              {props.fname}
              <i className="bx bxs-badge-check bx-tada bx-rotate-270"></i>
            </h2>

            <h6>Pricing:</h6>
            <h6>
              Rating: <i className="fa-regular fa-star"></i>
            </h6>
          </div>
        </div>
        <div className="artistsworkscontainer">
          <div className="artists-box__all-works">
            {props.works.length !== 0 ? (
              props.works.slice(0, 4).map((work, i) => {
                return (
                  <div key={i} className="artists-box__works">
                    <img
                      src={process.env.REACT_APP_ASSETS_URL + `/${work.image}`}
                      alt=""
                    />
                  </div>
                )
              })
            ) : (
              <h3 className="noworksposted">no works posted</h3>
            )}
          </div>
        </div>
      </li>
    </React.Fragment>
  )
}

export default ArtistItems
