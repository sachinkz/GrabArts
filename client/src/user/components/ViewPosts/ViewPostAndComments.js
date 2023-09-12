import React from 'react'

import ViewPost from './ViewPost'
import ViewComments from './ViewComments'
import "../../styles/ViewPostAndComments.css"

function ViewPostAndComments(props) {
    return props.items.map((post, i) => (
      <div key={i} className="both-post-and-comments">
        <div className="view-post-image-box">
          <ViewPost image={post.imageUrl} />
        </div>
        <div className='post-comments-box'>
          <ViewComments key={i} comments={post.comments} />
        </div>
      </div>
    ))
}

export default ViewPostAndComments
