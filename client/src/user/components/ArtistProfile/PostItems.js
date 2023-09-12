import React from 'react'

import "../../styles/PostItems.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min"


function PostItems(props) {
  return (
    <div className="aProfile-work-item__content">
      <Link to={`/posts/${props.postId}`}>
        <div className="aProfile-work-item__image">
          <img
            src={process.env.REACT_APP_ASSETS_URL + `/${props.image}`}
            alt="postpic"
          />
        </div>
      </Link>
    </div>
  )
}

export default PostItems
