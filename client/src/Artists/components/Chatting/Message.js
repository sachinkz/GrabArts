import React, { useState, useRef, useEffect } from "react"
import '../../styles/MessagePage.css'

function Message({ messages, artistId, messagingPerson, sendMessage }) {
  const [message, setMessage] = useState("")
  const scrollRef = useRef()

  const reqSendMessage = () => {
    sendMessage(message)
    setMessage("")
  }

  useEffect(() => {
    scrollRef.current &&
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])


  return (
    <div className="chat-container">
      {messagingPerson ? (
        <div className="aChats-feed-header">
          <img
            className="aChats-avatar-img"
            src={messagingPerson.image}
            alt=""
          />
          <h3 className="aChats-messenger-user-name">
            {messagingPerson.fname + " " + messagingPerson.lname}
          </h3>
          <i className="bx bxs-badge-check bx-tada bx-rotate-270"></i>
        </div>
      ) : (
        <img
          className="chat-not-opened-image"
          src="https://toppng.com/uploads/thumbnail/chat-bubble-vector-online-chat-115636305266uv3ekupxz.png" alt="start conversation"
        />
      )}
      {messagingPerson && (
        <div className="chat-messages">
          <div className="messages-box">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.sender !== artistId ? "message received" : "message sent"
                }
              >
                <img
                  className="aChats-avatar-img"
                  src={
                    m.sender !== artistId
                      ? "https://wallpapercave.com/wp/wp2551316.jpg"
                      : "https://wallpapercave.com/wp/wp2551316.jpg"
                  }
                  alt=""
                />
                <span ref={scrollRef} className="message-text">
                  {m.message}
                </span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder="Type your message..."
            />
            <button onClick={reqSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
