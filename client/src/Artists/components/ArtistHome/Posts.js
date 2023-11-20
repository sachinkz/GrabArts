import React, {  useContext, useState } from "react"
import "../../styles/ArtistHome.css"
import { AuthContext } from "../../../shared/contexts/AuthContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const Posts = (props) => {
  
  const [comment,setComment]=useState()
  const [postId, setPostId] = useState()
  const auth = useContext(AuthContext)
  
  const history=useHistory()

  const toArtistProfile = (e,id) => {
    e.preventDefault()
    history.push(`/profile/${id}`)
  }
  

  const setDatas = (comment, postId) => {
    setComment(comment)
    setPostId(postId)
  }
 
  return (
    <React.Fragment>
      {props.feeds ? (
        props.feeds.map((post, i) => (
          <div key={i} className="aHome-single-feed">
            <div
              onClick={(e) => toArtistProfile(e, post.artistId._id)}
              className="aHome-feed-header"
            >
              <img
                className="aHome-avatar-img"
                src={post.artistId.image}
                alt=""
              />
              <h3 className="aHome-user-name">
                {post.artistId.fname + " " + post.artistId.lname}
              </h3>
              {post.artistId.isVerified && (
                <i className="bx bxs-badge-check bx-tada bx-rotate-270"></i>
              )}
            </div>
            <div className="aHome-post-img">
              <img loading="lazy" src={process.env.REACT_APP_ASSETS_URL+`/${post.image}`} alt="postImage" />
            </div>
            <div className="aHome-feed-footer">
              <i
                className="bx bxs-heart"
                style={
                  post.likes.length !== 0 &&
                  post.likes.find(
                    (item) => item.artistId._id === auth.artistData.artistId
                  )
                    ? { color: "red" }
                    : { color: "white" }
                }
                onClick={(e) => props.likePost(e, post._id)}
              ></i>
              <i className="bx bx-message-square-dots"></i>
              <i className="bx bxs-paper-plane"></i>
            </div>

            <div className="aHome-likes-count">
              <h3>liked by </h3>
              {post.likes.length !== 0 ? (
                post.likes
                  .slice(0, 2)
                  .map((likes, i) => (
                    <h3 key={i}>{likes.artistId.fname + " "}</h3>
                  ))
              ) : (
                <h3>0 likes</h3>
              )}
              <h3>
                {post.likes.length > 2 &&
                  " and " + (post.likes.length - 2) + " more"}
              </h3>
            </div>

            {post.caption !== "null" && (
              <div className="aHome-feed-caption">
                <h4 className="aHome-user-name">
                  #{post.artistId.fname}
                  <span className="caption">{" : " + post.caption}</span>
                </h4>
              </div>
            )}
            <div className="aHome-feed-comments">
              <form
                onSubmit={(e) => props.postComment(e, postId, comment)}
                action=""
              >
                <input
                  type="text"
                  className="aHome-type-comment"
                  placeholder="add a comment"
                  id=""
                  required
                  onChange={(e) => setDatas(e.target.value, post._id)}
                />
                <button type="submit" className="aHome-post-comment">
                  <i className="bx bxs-paper-plane"></i>
                </button>
              </form>
              <div className="aHome-feed-postedcomments">
                {post.comments.length !== 0 &&
                  post.comments.slice(0, 4).map((comment, i) => (
                    <div key={i} className="aHome-each-comment">
                      <h4 className="aHome-user-name">
                        #{comment.artistId.fname} :
                        <span className="caption">{comment.comment}</span>
                      </h4>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>server error couldn't load posts</div>
      )}
    </React.Fragment>
  )
}

export default Posts
