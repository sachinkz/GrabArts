import React from 'react'

import "../../styles/ViewComments.css"

function ViewComments(props) {
  return (
    <div>
      <div className="write-comment-box">
        <form>
          <input id="review-input" type="text" placeholder="add a comment..." />
          <button type='submit'>post</button>
        </form>
      </div>
      {props.comments.map((item, i) => (
        <div className="view-comments-box">
          <h3>
            <span className="commentor-name">#{item.commentor}</span>:
            {item.comment}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default ViewComments
