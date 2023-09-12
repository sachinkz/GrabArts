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
        {props.reviews&& props.reviews.map((item, i) => (
          <div className="each-review-box" key={i}>
            <h4 className="reviewer-name">#{item.reviewer}: </h4>
            <h4>{item.review}</h4>
          </div>
        ))}
      </div>
    )
}

export default ArtistReviews
