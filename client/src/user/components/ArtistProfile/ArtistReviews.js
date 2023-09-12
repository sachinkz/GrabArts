import React from 'react'
import "../../styles/ArtistReviews.css"

function ArtistReviews(props) {
    return (
      <div className="all-review-box">
        <div className="review-heading-review">
          <h4>Reviews</h4>
        </div>
        <div className="write-reviews-box">
          <input
            id="review-input"
            type="text"
            placeholder="write your review about this artist here..."
          />
        </div>
            <div className="each-review-box" >
              <h4 className="reviewer-name">#sanju :</h4>
              <h4 className="reviewer-review">ivan scene</h4>
            </div>
      </div>
    )
}

export default ArtistReviews
