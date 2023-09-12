import React from "react"

function EachOrders(props) {
  return (
    <div className="My-orders-EachOrders">
      <div className="My-orders-empty-style">
        <h3 className="My-orders-order-status-note">
          <i className="bx bx-check-double bx-tada"></i>
        </h3>
        <h3 className="My-orders-order-status-date">expected</h3>
      </div>
      <div className="My-orders-image-and-details">
        <img
          src={process.env.REACT_APP_ASSETS_URL + `/${props.img}`}
          alt="ordered pic"
        />
        <div className="My-orders-order-details">
          <div className="My-orders-order-details-headings">
            <h4 className="My-orders-order-details-item">Artist:</h4>
            <h4 className="My-orders-order-details-item">style:</h4>
            <h4 className="My-orders-order-details-item">size:</h4>
            <h4 className="My-orders-order-details-item">Faces:</h4>
          </div>
          <div className="My-orders-order-details-span-values">
            <h4 className="My-orders-order-details-span">{props.artistName}</h4>
            <h4 className="My-orders-order-details-span">{props.style}</h4>
            <h4 className="My-orders-order-details-span">
              {props.paper} paper
            </h4>
            <h4 className="My-orders-order-details-span">{props.faces} face</h4>
          </div>
        </div>
      </div>
      <div className="My-orders-order-status">
        {props.status === "paid" && (
          <h3 className="My-orders-order-status-note">ORDER PLACED</h3>
        )}
        {props.status === "verified" && (
          <h3 className="My-orders-order-status-note">ARTIST ACCEPTED</h3>
        )}
        <h3 className="My-orders-order-status-date">
          expected delivery on <span>29/08/23</span>
        </h3>
      </div>
    </div>
  )
}

export default EachOrders
