import React from 'react'

import "../../styles/Posts.css"
import PostItems from './PostItems'
import Card from '../../../shared/components/UIElements/Card'

function PostDisplay(props) {
  if (props.profile && props.profile.posts.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No posts yet</h2>
        </Card>
      </div>
    )
  }

  return (
    <Card className={"aProfile-artists-posts-card  "}>
      {props.profile &&
        props.profile.posts.map((post, i) => (
          <div key={i} className="aProfile-post-items-div">
            <PostItems
              id={post.id}
              image={post.image}
              creatorId={post.artistId}
            />
          </div>
        ))}
    </Card>
  )
}   


export default PostDisplay
