import React from 'react'

import ProfileDetails from './ProfileDetails'


function ArtistProfileDetails(props) {


  return (
    <ul className="users-list">
      {props.profile && (
        <ProfileDetails
          artistId={props.profile._id}
          image={props.profile.image}
          fname={props.profile.fname}
          lname={props.profile.lname}
          followers={props.profile.followers}
          pricing={props.pricing}
        />
      )}
    </ul>
  )
}
export default ArtistProfileDetails
