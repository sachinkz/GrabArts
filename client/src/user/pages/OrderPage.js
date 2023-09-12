import React, { useCallback, useContext, useEffect, useState } from 'react'

import OrderPageItems from '../components/OrderPage/OrderPageItems'
import MainNavigation from '../../shared/components/Navigation/MainNavigation'
import DeliveryDetails from '../components/OrderPage/DeliveryDetails'
import { AuthContext } from '../../shared/contexts/AuthContext'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'



function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}





function OrderPage() {

  const [values, setValues] = useState(false)
  const [pricing, setPricing] = useState(false)
  const [image, setImage] = useState()
  const auth = useContext(AuthContext);
  const history=useHistory()
  const artistId = useParams().artistId
  
 /////////////////////////////////////////////////
  const handleSubmit = (val,img,total) => {
    val.total=total
    setValues(val)
    setImage(img)
  }
  //////////////////////////////////////////////////
  const getPricing = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/users/pricing/${artistId}`)
      .then((res) => {
        setPricing(res.data)
      })
  },[artistId])

  useEffect(() => {
    getPricing()
  },[getPricing])

///////////////////////////////////////////////////
  
   const verifyPayment = (response, rporder) => {
     const body = {
       response,
       rporder
     }
     axios
       .post(process.env.REACT_APP_BACKEND_URL + "/users/verify-payment", body)
       .then((res) => {
         history.push("/order-history")
       })
       .catch((err) => {
         console.log(err)
       })
   }

  
  //////////////////////////////////////////////////////
  const submitOrder = async (vals) => {
    
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Razropay failed to load!!")
      return
    }
    const formData = new FormData()

    formData.append("userId", auth.userData.userId)
    formData.append("artistId", artistId)
    formData.append("paper", values.paper)
    formData.append("face", values.face)
    formData.append("style", values.style)
    formData.append("name", vals.name)
    formData.append("email", vals.email)
    formData.append("mobile", vals.mobile)
    formData.append("address1", vals.address1)
    formData.append("address2", vals.address2)
    formData.append("pin", vals.pin)
    formData.append("city", vals.city)
    formData.append("district", vals.district)
    formData.append("image", image)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + `/users/order`,
        formData,
        config
      )
      .then((res) => {
        const options = {
          key: "rzp_test_OcJOekB7dEDYqX", // Enter the Key ID generated from the Dashboard
          amount: res.data.rp.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "GrabArts",
          description: "Test Transaction",
          image:
            "https://cdn1.vectorstock.com/i/1000x1000/11/15/ga-monogram-logo-with-3-pieces-shape-isolated-on-vector-31031115.jpg",
          order_id: res.data.rp.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            verifyPayment(response, res.data.rp)
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#2266cc",
          },
          redirect: false,
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
      })
      .catch((err) => console.log(err))    
  
  }


 

  return (
    <React.Fragment>
      <MainNavigation />
      {!values && (
        <OrderPageItems handleSubmit={handleSubmit} pricing={pricing} />
      )}
      {values && <DeliveryDetails submitOrder={submitOrder} orderDetails={values} />}
    </React.Fragment>
  )
}

export default OrderPage
