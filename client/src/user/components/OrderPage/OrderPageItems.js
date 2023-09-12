import React,{useState} from 'react'

import '../../styles/OrderPageItems.css'

function OrderPage({handleSubmit,pricing}) {

  const [error,setError]=useState(false)
   const [values, setValues] = useState({
     style: "",
     paper: "",
     face: "",
     total: "",
     suggestion:"",
   })

  const [selectedImage, setSelectedImage] = useState(null)

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  
  
  const requestSubmit = (e) => {
    e.preventDefault();
    if (
      values.paper !== "" &&
      values.face !== "" &&
      values.style !== "" &&
      selectedImage
    )
    {
      let item = values.paper + "_" + values.face
      console.log(item)
      let style = pricing.styles.find((s) => s.style === values.style)
      handleSubmit(values, selectedImage, style[item])
      setError(false)
    } else {
      setError(values)
    }
  }

  const handleImageClosing = () => {
    setSelectedImage(null)  
  }





  return (
    <div className="order-page">
      <form className="order-form row">
        <div className="form-group col-md-12">
          <label htmlFor="images" className="drop-container">
            <span className="drop-title">Upload Your Image Here..</span>
            {selectedImage && (
              <div className="image-and-closeBtn">
                <i
                  onClick={handleImageClosing}
                  className="imagecloseBtn bx bx-reset"
                ></i>
                <img
                  className="orderPage-image-file"
                  alt="not found"
                  src={URL.createObjectURL(selectedImage)}
                />
              </div>
            )}
            {!selectedImage && (
              <h3 className="click-here-text">Click Here...</h3>
            )}
            <p>
              : note that the faces in the image you are uploading should be
              clear and have enough details
            </p>
            {error && !selectedImage && (
              <p className="orderpage-errortext">*please upload an image</p>
            )}
            <input
              type="file"
              id="images"
              accept="image/*"
              required
              onChange={(event) => setSelectedImage(event.target.files[0])}
            />
          </label>
        </div>
        <div className="input-field-and-icon">
          <label
            className={
              error && error.style === ""
                ? "orderpage-common-errortext orderpage-inputlabel"
                : "orderpage-inputlabel"
            }
          >
            {"*in which style you need your portrait?"}
          </label>
          <select
            name="style"
            onChange={onChangeHandler}
            required
            className="paper-size-select"
          >
            <option value={""}>select a style...</option>
            {pricing &&
              pricing.styles.map((s, i) => <option key={i}>{s.style}</option>)}
          </select>

          <label
            className={
              error && error.paper === ""
                ? "orderpage-common-errortext orderpage-inputlabel"
                : "orderpage-inputlabel"
            }
          >
            {"*in which size of paper you need your portrait?"}
          </label>
          <select
            name="paper"
            onChange={onChangeHandler}
            required
            className="paper-size-select"
          >
            <option value={""}>select a paper size...</option>
            <option>A3</option>
            <option>A4</option>
            <option>A5</option>
          </select>
          <label
            className={
              error && error.face === ""
                ? "orderpage-common-errortext orderpage-inputlabel"
                : "orderpage-inputlabel"
            }
          >
            {"*how many faces are there in the provided picture?"}
          </label>
          <select
            name="face"
            onChange={onChangeHandler}
            required
            className="paper-size-select"
          >
            <option value={""}>number of faces...</option>
            <option value={"1"}>1 face</option>
            <option value={"2"}>2 faces</option>
            <option value={"3"}>3 faces</option>
            <option value={"4"}>4 faces</option>
            <option value={"5"}>more than 4 faces</option>
          </select>

          <label className="orderpage-inputlabel">
            {"your suggestions (optional)"}
          </label>
          <textarea
            name='suggestion'
            className="orderpage-inp-field"
            onChange={onChangeHandler}
            placeholder="add any suggestions"
          ></textarea>
        </div>
        {error && (
          <p className="orderpage-errortext">
            *please provide required details
          </p>
        )}
        <p className="important-note">
          important :Note that the number of faces must be correct. If its not
          correct your order might get cancelled
        </p>
        {values.total && <h3>{values.total}</h3>}
        <button
          className="orderpage-submitbtn"
          onClick={requestSubmit}
          type="submit"
        >
          CONTINUE
        </button>
      </form>
    </div>
  )
}

export default OrderPage
