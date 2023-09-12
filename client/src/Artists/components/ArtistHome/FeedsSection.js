import React, { lazy } from "react"
import "../../styles/ArtistHome.css"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const Posts=lazy(()=>import('./Posts'))

const FeedsSection = (props) => {
  return (
    <div className="aHome-feeds">
      <div className="aHome-search-section">
        <form action="">
          <input
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
