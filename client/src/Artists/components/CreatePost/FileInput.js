import React, { useState } from "react"
import '../../styles/CreatePost.css'
import PostDetails from './PostDetails'

const FileInput = (props) => {

  const [selectedImage, setSelectedImage] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)

  const nextPage = () => {
    setImageUploaded(true)
  }
  const backPage = () => {
    setImageUploaded(false)
  }
 

  return (
    <React.Fragment>
      <form className="aPost-whole-post-form">
        {!imageUploaded && (
          <label htmlFor="images" className="aPost-file-input ">
            <div className="aPost-close-btn-div">
              <button className="aPost-other-btns-cancel" onClick={props.close}>
                <i className="bx bx-x-circle"></i>
              </button>
              {selectedImage && (
                <button onClick={nextPage} className="aPost-other-btns-next">
                  NEXT
                </button>
              )}
            </div>
            <label
              htmlFor="images"
              className="aPost-fileinput-drop-container"
            >
              <span className="drop-title">Upload Your Image Here..</span>
              {selectedImage && (
                <div className="image-and-closeBtn">
                  <img
                    className="aPost-image-file"
                    alt="not found"
                    src={URL.createObjectURL(selectedImage)}
                  />
                </div>
              )}
              {!selectedImage && (
                <h3 className="click-here-text">Click Here...</h3>
              )}
              <input
                type="file"
                id="images"
                accept="image/*"
                required
                hidden
                onChange={(event) => setSelectedImage(event.target.files[0])}
              />
            </label>
          </label>
        )}
        {imageUploaded && (
          <PostDetails
            reload={props.reload}
            backPage={backPage}
            image={selectedImage}
          />
        )}
      </form>
    </React.Fragment>
  )
}

export default FileInput
