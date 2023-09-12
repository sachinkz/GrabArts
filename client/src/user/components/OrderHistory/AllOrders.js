import React from "react"
import EachOrders from "./EachOrders"
import "../../styles/MyOrders.css"

function AllOrders({ orders }) {

  orders&&console.log(orders)
  return (
    <div className="My-orders-main">
      {orders && orders.length!==0 ? (
        orders.map((order, i) => (
          <EachOrders
            key={i}
            artistName={order.artistId.fname + " " + order.artistId.lname}
            style={order.style}
            faces={order.face}
            paper={order.paper}
            status={order.status}
            img={order.image}
          />
        ))
      ) : (
          <div className="My-orders-no-orders center">
          <h2>{"No orders Yet :("}</h2>
        </div>
      )}
    </div>
  )
}

export default AllOrders
