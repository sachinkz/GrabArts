import React, { lazy, useState } from "react"
import "../../styles/ArtistHome.css"
import "react-loading-skeleton/dist/skeleton.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const Posts = lazy(() => import('./Posts'))


const FeedsSection = (props) => {


  const history=useHistory()
  const [searchInput, setSearchInput] = useState('')
  const [filtered, setFiltered] = useState([])

  const search = (e) => {
    setSearchInput(e.target.value)
    const filteredItems = props.artistNames.filter(item => item.fname.toLowerCase().includes(searchInput.toLowerCase().trim()));
    setFiltered(filteredItems)
  }

  console.log(filtered)

  const toArtistProfile = (e, id) => {
    e.preventDefault()
    history.push(`/profile/${id}`)
  }


  return (
    <div className="aHome-feeds">
      <div className="aHome-search-section">
        <form action="">
          <input
            onChange={(e) => search(e)}
            type="text"
            className="aHome-type-comment"
            placeholder="search by username"
            name=""
            id=""
          />
          <button type="submit" className="aHome-post-comment">
            <i className="bx bx-search-alt"></i>
          </button>
        </form>
        {filtered && searchInput.trim() !== '' && <div className="">
          <ul className="aHome-search-results">
            {filtered.map((artist) => {
              return <li onClick={(e) => toArtistProfile(e, artist._id)} className="aHome-search-each-results" key={artist._id}>
                <img src={artist.image} className="aHome-search-result-img"></img>
                <h6 className="aHome-search-result-name">{artist.fname} {artist.lname}</h6>
                {artist.isVerified && (
                  <i className="aHome-search-results-badge bx bxs-badge-check bx-tada bx-rotate-270"></i>
                )}
              </li>
            })}
          </ul>
        </div>}
      </div>

      <Posts
        feeds={props.feeds}
        postComment={props.postComment}
        likePost={props.likePost}
      />
    </div>
  )
}

export default FeedsSection;
