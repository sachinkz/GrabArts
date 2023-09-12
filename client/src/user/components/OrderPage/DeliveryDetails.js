import React,{useState} from 'react'
import Input from '../../../shared/components/UIElements/Input'
import '../../styles/DeliveryDetails.css'


function DeliveryDetails({submitOrder,orderDetails}) {

  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    pin: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
  })

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
    submitOrder(values)
  }



  return (
    <div className="deliveryAdressPage">
      <h3 className="page-main-heading">Delivery Address</h3>
      <form className="adress-input-form" action="">
        {ORDER_DATAS.map((input,i) => (
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
      <div className="details-and-pricing">
        <div className="details-and-pricing-detailsdiv">
          <h4 className="details-and-pricing-head">order details</h4>
          <h6 className="details-and-pricing-details">
            faces in picture: <span>{orderDetails.face}</span>face
          </h6>
          <h6 className="details-and-pricing-details">
            paper size: <span>{orderDetails.paper} </span>size
          </h6>
          <p className="details-and-pricing-note">
            note: price will varry with the number of faces and size of the
            paper
          </p>
        </div>
        <div className="details-and-pricing-pricing">
          <h6 className="details-and-pricing-details">
            price: <span>{orderDetails.total}</span> rs
          </h6>
          <h6 className="details-and-pricing-details">
            gst: <span>0%</span>
          </h6>
          <h5 className="details-and-pricing-total">
            total: <span>{orderDetails.total}</span>
          </h5>
        </div>
      </div>
      <button
        id="rzp-button1"
        onClick={submitHandler}
        className="placeOrderBtn"
      >
        PROCEED TO PAYMENT
      </button>
    </div>
  )
}

export default DeliveryDetails
