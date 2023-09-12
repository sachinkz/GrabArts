import React from 'react'

import "../../styles/ViewPost.css"

function ViewPost(props) {
  return (
    <div className="main-post__image-box">
      <img src={props.image} alt="post" />
      <div className="post-image__actions">
        <i className="fa-solid fa-thumbs-up "></i>
        <i className="fa-solid fa-comment"></i>
        <i className="fa-solid fa-share"></i>
      </div>
    </div>
  )
}

export default ViewPost
