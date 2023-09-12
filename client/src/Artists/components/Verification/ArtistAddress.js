import React, { useState } from "react"
import Input from "../../../shared/components/UIElements/Input"
import '../../styles/PricingInput.css'

function ArtistAddress({ getartistAddress }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    pin: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    experience: "5-10",
  })

  const [selectedImage, setSelectedImage] = useState()
  // array of items for the input field element
  const ORDER_DATAS = [
    {
      id: "1",
      name: "name",
      type: "text",
      placeholder: "full name",
      errortext: "please provide name",
      required: true,
      label: "your full name",
    },
    {
      id: "2",
      name: "email",
      type: "email",
      placeholder: "email address",
      errortext: "provide a valid email",
      pattern: "^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$",
      required: true,
      label: "email address",
    },
    {
      id: "3",
      name: "mobile",
      type: "number",
      placeholder: "mobile number",
      errortext: "enter a valid mobile number",
      pattern: `^{10}$`,
      required: true,
      label: "mobile number",
    },
    {
      id: "4",
      name: "pin",
      type: "number",
      placeholder: "pincode",
      errortext: "enter a valid pincode",
      pattern: `^[0-9]{6}$`,
      required: true,
      label: "pin code",
    },
    {
      id: "5",
      name: "address1",
      type: "text",
      placeholder: "house/flat/office ",
      errortext: "please provide an address",
      required: true,
      label: "address line 1",
    },
    {
      id: "6",
      name: "address2",
      type: "text",
      placeholder: "street/locality/village",
      errortext: "please provide an address",
      required: true,
      label: "address line 2",
    },
    {
      id: "7",
      name: "city",
      type: "text",
      placeholder: "city/town",
      errortext: "please provide city",
      required: true,
      label: "city",
    },
    {
      id: "8",
      name: "district",
      type: "text",
      placeholder: "district",
      errortext: "please provide an district",
      required: true,
      label: "district",
    },
  ]

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  
  const submitHandler = (e) => {
    e.preventDefault()
    let empty = Object.values(values).some((value) => value === "")
    if (!empty && selectedImage) {
      getartistAddress(values)
    }
  }

  return (
    <div className="deliveryAdressPage">
      <h3 className="page-main-heading">Your Address</h3>
      <form className="adress-input-form" action="">
        {ORDER_DATAS.map((input, i) => (
          <div key={i} className="deliverydetails-input-label">
            <label className="label-for-delivery-address">*{input.label}</label>
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChangeHandler}
            ></Input>
          </div>
        ))}
      </form>
      <h3 className="page-main-heading">Few More Details</h3>
      <form className="adress-input-form" action="">
        <div className="deliverydetails-input-label">
          <label className="label-for-delivery-address">
            how many commisioned works have you done before?
          </label>
          <select
            name="experience"
            onChange={onChangeHandler}
            className="paper-size-select mb-4"
          >
            <option>1-5</option>
            <option>5-10</option>
            <option>10-20</option>
            <option>more than 20</option>
          </select>
        </div>
        <div className="deliverydetails-input-image-and-input">
          <label htmlFor="images" className="aPost-fileinput-drop-container ">
            <span className="drop-title">
              upload an image of your best work
            </span>
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
              className="apost-input-button-for-image"
              onChange={(event) => setSelectedImage(event.target.files[0])}
            />
          </label>
        </div>
      </form>
      <button
        id="rzp-button1"
        onClick={submitHandler}
        className="a-post-placeOrderBtn"
      >
        REQUEST VERIFICATION
      </button>
    </div>
  )
}

export default ArtistAddress
