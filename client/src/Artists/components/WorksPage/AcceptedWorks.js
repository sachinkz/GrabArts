import React from "react"

function AcceptedWorks(props) {
  const handleDownload = async () => {
    const response = await fetch(
      process.env.REACT_APP_ASSETS_URL + `/${props.img}`
    )
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = blobUrl
    link.download = "grabarts-work-image.jpg"
    link.click()
  }

  return (
    <div className="My-work-EachOrders">
      <div className="My-work-image-and-details">
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
        <h3 className="My-work-customer-address-heading">Customer Address</h3>
        <div className="My-work-customer-address">
          <h6 className="My-work-customer-address-item">{props.address1}</h6>
          <h6 className="My-work-customer-address-item">{props.address2}</h6>
          <h6 className="My-work-customer-address-item">{props.city}</h6>
          <h6 className="My-work-customer-address-item">{props.district}</h6>
          <h6 className="My-work-customer-address-item">{props.pin}</h6>
          <h6 className="My-work-customer-address-item">{props.mobile}</h6>
        </div>
        <label className="My-work-ckeckbox-label">
          you only have 5 more days to finish the work
        </label>
      </div>
      <div className="My-work-order-status-updation"></div>
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

export default AcceptedWorks
