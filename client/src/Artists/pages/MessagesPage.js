import React, { useState, useEffect, useCallback, useContext } from "react"
import axios from "axios"
import io from "socket.io-client"
import { AuthContext } from '../../shared/contexts/AuthContext'
import Recent from '../components/Chatting/RecentChats'
import Message from '../components/Chatting/Message'

const socket = io("https://ga-socket.onrender.com")

function MessagesPage() {
  const auth = useContext(AuthContext)
  const artistId = auth.artistData.artistId

  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentConvo, setCurrentConvo] = useState(null)
  const [messagingPerson, setMessagingPerson] = useState(null)

  const getConversations = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/message/${artistId}`)
      .then((res) => {
        setConversations(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [artistId])




useEffect(() => {
  socket.on("getMessage", ({ sender, message }) => {
    console.log(sender, message)
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: message, sender: sender },
    ])
  })
  return () => {
    socket.off("getMessage")
  }
}, [])


  
  useEffect(() => {
    socket.emit("addUser", artistId)
    socket.on("getUsers", (onlineUsers) => {
      setOnlineUsers(onlineUsers)
    })

    return () => {
      socket.off("getUsers")
    }
  }, [artistId])


  useEffect(() => {
    getConversations()
  }, [getConversations])





  const getMessages = useCallback(
    (convo) => {
      axios
        .get(process.env.REACT_APP_BACKEND_URL + `/message/chat/${convo._id}`)
        .then((res) => {
          setMessages(res.data)
          setCurrentConvo(convo)
        })
        .catch((err) => {
          console.error(err)
        })

      const friendId = convo.members.find((id) => id !== artistId)
      axios
        .get(process.env.REACT_APP_BACKEND_URL + `/message/profile/${friendId}`)
        .then((res) => {
          setMessagingPerson(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    [artistId]
  )






  const sendMessage = (message) => {
    if (message.trim() !== "") {
      const chatBody = {
        conversationId: currentConvo._id,
        sender:artistId,
        message: message,
      }

      const updatedMessages = [...messages, chatBody]
      setMessages(updatedMessages)

      socket.emit("sendMessage", {
        message,
        sender: artistId,
        receiver: messagingPerson._id,
      })

      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/message/chat", chatBody)

        .catch((err) => {
          console.error(err)
        })
    }
  }


    
  return (
    <div className="aChats-outer-container">
      <Recent
        getMessages={getMessages}
        conversations={conversations}
        artistId={artistId}
        onlineUsers={onlineUsers}
      />
      <Message
        sendMessage={sendMessage}
        messages={messages}
        artistId={artistId}
        messagingPerson={messagingPerson}
      />
    </div>
  )
}

export default MessagesPage
