import React,{useState,useCallback,useEffect} from 'react'
import axios from 'axios'




function ConvoWith({ friend, artistId, getMessages, onlineUsers }) {
  
  const [friendDetails, setFriendDetails] = useState()

  const getArtistProfile = useCallback(() => {
    
    const friendId = friend.members.find((m) => m !== artistId)
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/message/profile/${friendId}`)
      .then((res) => {
        setFriendDetails(res.data)
      })
  }, [friend, artistId])

  useEffect(() => {
    getArtistProfile()
  }, [getArtistProfile])

  const sendGetMessagesReq = () => {
    getMessages(friend)
  }


  return (
    <div onClick={sendGetMessagesReq}>
      {friendDetails && (
        <div className="aChats-feed-header">
          <div className="aChat-avatar-online-dot">
            <img
              className="aChats-avatar-img"
              src={friendDetails.image}
              alt=""
            />
            {onlineUsers && onlineUsers.find(id=>id.userId===friendDetails._id) &&
              (<i class="online-green-dot bx bx-radio-circle-marked"></i>)
            }
          </div>
          <h3 className="aChats-user-name">{friendDetails.fname}</h3>
          <i className="bx bxs-badge-check bx-tada bx-rotate-270 aChat-convo-verified-icon"></i>
        </div>
      )}
    </div>
  )
}

export default ConvoWith

