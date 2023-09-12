import React, { useState } from 'react'
import EachWork from './EachWork'
import "../../styles/Myworks.css"
import AcceptedWorks from './AcceptedWorks';


function Allworks({ works,accWorks }) {
  
  const [acceptedPage, setAcceptedPage] = useState(false);

  const acceptedWOrks = () => {
    setAcceptedPage(true)
  }
  const workRequestPage = () => {
    setAcceptedPage(false)
  }

  return (
    <div className="My-works-main">
      <div className="My-works-btn-nav-heading">
        <button
          onClick={workRequestPage}
          className={
            !acceptedPage
              ? "My-works-req-works-btn-active"
              : "My-works-accepted-works-btn"
          }
        >
          WORK REQUESTS
        </button>
        <button
          onClick={acceptedWOrks}
          className={
            acceptedPage
              ? "My-works-accepted-works-btn-active"
              : "My-works-accepted-works-btn"
          }
        >
          ACCEPTED WORKS
        </button>
      </div>
      {!acceptedPage && works && works.length !== 0
        ? works.map((order, i) => (
            <EachWork
              key={i}
              orderId={order._id}
              userName={order.userId.fname + " " + order.userId.lname}
              style={order.style}
              faces={order.face}
              paper={order.paper}
              suggestion={order.suggestion}
              status={order.status}
              img={order.image}
            />
          ))
        : !acceptedPage && (
            <div className="center">
              <h2 className="center">{"no work requests :("}</h2>
            </div>
          )}

      {acceptedPage &&
        accWorks.map((order, i) => (
          <AcceptedWorks
            key={i}
            orderId={order._id}
            userName={order.userId.fname + " " + order.userId.lname}
            style={order.style}
            faces={order.face}
            paper={order.paper}
            suggestion={order.suggestion}
            status={order.status}
            img={order.image}
            address1={order.address1}
            address2={order.address2}
            mobile={order.mobile}
            district={order.district}
            pin={order.pin}
            city={order.city}
          />
        ))}
    </div>
  )
}

export default Allworks
