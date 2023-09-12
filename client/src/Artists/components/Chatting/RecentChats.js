import React from 'react'
import '../../styles/MessagePage.css'
import ConvoWith from './ConvoWith'

function Recent({ getMessages, conversations, artistId ,onlineUsers}) {
  return (
    <div className="recent-chats-container">
      <div className="recent-chats-header">
        <i className="recent-chats-opener bx bx-dots-horizontal-rounded"></i>
        <h3 className="recent-chats-heading">recent chats</h3>
      </div>
      {conversations.map((c) => (
        <ConvoWith
          key={c._id}
          friend={c}
          artistId={artistId}
          getMessages={getMessages}
          onlineUsers={onlineUsers}
        />
      ))}
    </div>
  )
}

export default Recent
