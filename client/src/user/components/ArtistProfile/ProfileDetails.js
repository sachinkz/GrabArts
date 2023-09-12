import React,{useState} from 'react'

import "../../styles/Profiledetails.css"
import Modal from '../../../shared/components/UIElements/Modal'
import Button from '../../../shared/components/UIElements/Button'
import Avatar from '../../../shared/components/UIElements/Avatar'
import Card from '../../../shared/components/UIElements/Card'
import Pricing from './Pricing'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function ProfileDetails(props) {
  const [showMap, setShowMap] = useState(false)
   const history=useHistory()
   const openModal = () => setShowMap(true)
  const closeModal = () => setShowMap(false)
  
  const goToOrderPage = () => {
    console.log(props.artistId)
    history.push(`/order/${props.artistId}`)
  }
   

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeModal}
        header={"Pricing Details"}
        contentClass={"place-item__modal-content"}
        footerClass={"place-item__modal-actions"}
        footer={
          <Button onClick={closeModal} normal>
            CLOSE
          </Button>
        }
      >
        <Pricing styles={props.pricing} />
      </Modal>

      <Card className={"artist-details-card"}>
        <div className="artist-alldetails-area">
          <div className="profile-page-avatar">
            <Avatar
              className={"profile-page-avatar"}
              image={props.image}
              width={"200px"}
            />
          </div>
          <div className="artist-detials-area">
            <h1 className="artist-detials-area_name">
              {props.fname} {props.lname}
            </h1>
            <hr />
            <h3 className="artist-detials-bio"> this is a sample bio</h3>
            <h5 className="artist-detials-pricing">
              <strong>{props.followers.length}</strong>
              {props.followers.length === 1 ? "  follower" : " followers"}
            </h5>
            <h5 className="artist-detials-rating">
              Rating: 4.5 <i className="ratingstatr fa-solid fa-star"></i>
            </h5>
              {/* {props.styles.map((style, i) => ( */}
              <h5 className="artist-detials-style">pencil ,colour pencil</h5>
              {/* ))} */}
          </div>
        </div>
        <div className="order-buttons-div">
          <Button onClick={goToOrderPage} normal>
            Order Now
          </Button>
          <Button onClick={openModal} normal>
            View Pricing
          </Button>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default ProfileDetails
