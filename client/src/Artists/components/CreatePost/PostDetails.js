import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../../shared/contexts/AuthContext'

function PostDetails(props) {

  const [caption,setCaption]=useState(null)
  const auth=useContext(AuthContext)

  const createPost = () => {
   const formData=new FormData()
   
     formData.append('artistId', auth.artistData.artistId)
     formData.append('caption', caption)
    formData.append("image", props.image)
    
    const config = {
      headers: {
        Authorization: auth.artistData.token,
        "Content-Type": "multipart/form-data",
      },
    }

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/artists/post",
        formData,
        config
      )
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err.response.message))
        
 }
  return (
      <label htmlFor="images" className="aPost-file-input ">
        <div className="aPost-Caption-pageheader">
          <button className="aPost-back-btn" onClick={props.backPage}>
            <i className="bx bxs-left-arrow"></i>
          </button>
          <h4 className='aPost-post-box-heading'>create New Post</h4>
          <button onClick={createPost} className="aPost-post-btn" type="submit">
            POST
          </button>
        </div>
        <div className='aPost-image-and-caption'>
          <div className='aPost-image-display'>
            {props.image && (
                <img
                  className="aPost-displayimage-file"
                  alt="not found"
                  src={URL.createObjectURL(props.image)}
                />
            )}
          </div>
          <div className='aPost-caption-input'>
            <textarea onChange={e=>setCaption(e.target.value)} type="text" placeholder='add a caption' className='aPost-caption-input-field' />
          <h6 className='aPost-caption-input-username'>@{ auth.artistData.fname}</h6>
          </div>
        </div>
      </label>
  )
}

export default PostDetails
