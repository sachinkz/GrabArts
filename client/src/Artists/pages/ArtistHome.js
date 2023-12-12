import React, { useCallback, useContext, useEffect, useState } from 'react'
import Sidebar from '../components/ArtistHome/Sidebar'
import RightSection from '../components/ArtistHome/RightSection'
import FeedsSection from '../components/ArtistHome/FeedsSection'
import axios from 'axios'
import io from "socket.io-client"
import FileInput from '../components/CreatePost/FileInput'
import Backdrop from '../../shared/components/UIElements/Backdrop'
import { AuthContext } from '../../shared/contexts/AuthContext'

const socket = io("https://ga-socket.onrender.com")





function ArtistHome() {
  const [feeds, setFeeds] = useState()
  const [artistNames, setArtistNames] = useState()
  const [showCreatePost, setShowCreatePost] = useState(false)
  const auth=useContext(AuthContext)
   

  useEffect(() => {
    socket.emit("addUser", auth.artistData.artistId)
  })

  
  const getArtistPosts = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/artists/home`, {
        headers: {
          Authorization: auth.artistData.token,
        },
      })
      .then((datas) => {
        setFeeds(datas.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [auth])


  const getArtistNames = useCallback(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/artists/artist-names`, {
        headers: {
          Authorization: auth.artistData.token,
        },
      })
      .then((datas) => {
        setArtistNames(datas.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [auth])
    

  

    useEffect(() => {
      getArtistPosts()
      getArtistNames()
    }, [getArtistPosts,getArtistNames, auth])

  
  
   const likePost = (e, postId) => {
     e.preventDefault();
     const body = {
       postId,
       artistId: auth.artistData.artistId,
     }
     axios
       .post(process.env.REACT_APP_BACKEND_URL+"/users/like", body)
       .then(() => {
         getArtistPosts()
       })
       .catch((err) => {
         console.log(err)
       })
  }
  
  const postComment = (e, postId,comment) => {
    e.preventDefault()
    const datas = {
      postId,
      comment,
      artistId: auth.artistData.artistId,
    }
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users/comment", datas)
      .then((res) => {
        console.log(res.data)
        getArtistPosts()
      })
      .catch((err) => console.log(err))
  }


  const showPost = () => {
    setShowCreatePost(true)
  }
  const hidePost = () => {
    setShowCreatePost(false)
  }
  



  return (
    <div className="aHome-main-container row">
      {showCreatePost && <Backdrop show={showCreatePost} close={hidePost} />}
      {showCreatePost && <FileInput close={hidePost} />}
      <Sidebar showPost={showPost} />
      <FeedsSection
        artistNames={artistNames}
        feeds={feeds}
        postComment={postComment}
        likePost={likePost}
      />
      <RightSection />
    </div>
  )
}

export default ArtistHome



