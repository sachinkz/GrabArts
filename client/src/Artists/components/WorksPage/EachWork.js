import React, { useContext, useState } from "react"
import "../../styles/Myworks.css"
import axios from 'axios'
import { AuthContext } from "../../../shared/contexts/AuthContext"
function EachWork(props) {


  const [agreed, setAgreed] = useState(false)
  const [notAgreed,setNotAgreed] = useState(false)
  const auth=useContext(AuthContext)

  const agreeHandler = () => {
    setAgreed(prev=>!prev)
  }


  const acceptWork = () => {

    const orderId = props.orderId
    console.log(orderId)
    if (agreed)
    {
      axios
        .get(process.env.REACT_APP_BACKEND_URL + `/artists/accept/${orderId}`, {
          headers: { Authorization: auth.artistData.token },
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }else{
      setNotAgreed(true)
    }
  }


  const handleDownload = async() => {
    const response = await fetch(
      process.env.REACT_APP_ASSETS_URL + `/${props.img}`
    )
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl
    link.download = 'grabarts-work-image.jpg'
    link.click()
  }
console.log(agreed)

  return (
    <div className="My-work-EachOrders">
      <div className="My-work-image-and-details">
        <div>
          <h3 className="My-work-caution-notice">
            verify that the number of faces in the image and number of faces
            provided by the customer are same.if not same reject the order. if
            you ignore this and accept the work you will only be paid for the
            number of faces provided by the customer
          </h3>
        </div>
        <div className="My-work-order-details-headings">
          <div>
            <h5 className="btn btn-primary m-2">{props.style}</h5>
            <h5 className="btn btn-primary m-2">{props.paper} Paper</h5>
            <h5 className="btn btn-primary m-2">{props.faces} Face</h5>
            {!props.suggestion ? (
              <h5 className="btn btn-primary m-2">No Customer Suggestions</h5>
            ) : (
              <h5 className="btn btn-primary m-2">{props.suggestion}</h5>
            )}
          </div>
        </div>
        <label className="My-work-ckeckbox-label">
          the order will be expired in 24 hrs
        </label>
        <form>
          <input onChange={agreeHandler} type="checkbox" />
          <label
            className={
              notAgreed
                ? "My-work-ckeckbox-label-red"
                : "My-work-ckeckbox-label"
            }
          >
            i have verified the number of faces
          </label>
        </form>
      </div>
      <div className="My-work-order-status-updation">
        <button onClick={acceptWork} className="My-work-accept-btn">
          ACCEPT WORK
        </button>
        <button className="My-work-reject-btn">REJECT WORK</button>
      </div>
      <div className="My-works-image-and-download">
        <img
          src={process.env.REACT_APP_ASSETS_URL + `/${props.img}`}
          alt="ordered pic"
        />
        <button onClick={handleDownload}>DOWNLOAD IMAGE</button>
      </div>
    </div>
  )
}

export default EachWork
