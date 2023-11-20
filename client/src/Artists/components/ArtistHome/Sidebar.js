import React, { useContext } from "react"
import "../../styles/ArtistHome.css"
import { AuthContext } from "../../../shared/contexts/AuthContext"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"

const Sidebar = (props) => {
  
  const history =useHistory()
  const auth = useContext(AuthContext)
  
  const redirect = (e, link) => {
    e.preventDefault()
    history.push(`/${link}`)
  }

  const handleLogout=(e)=>{
    auth.artistLogOut()
    redirect(e,'')
  }
  

  return (
    <div className="aHome-navlinks">
      <div className="aHome-navlinks-topitems">
        <h1 className="aHome-logo">GrabArts</h1>
        <Link
          onClick={(e) => redirect(e, "")}
          className="aHome-navlinks-items-link"
        >
          <div className="aHome-navlinks-eachitems">
            <i className="bx bx-home-circle aHome-navlinks-icons"></i>
            <h2 className="aHome-navlinks-items">HOME</h2>
          </div>
        </Link>
        <Link
          onClick={(e) => redirect(e, "messages")}
          className="aHome-navlinks-items-link"
        >
          <div className="aHome-navlinks-eachitems">
            <i className="bx bx-message-square-dots aHome-navlinks-icons"></i>
            <h2 className="aHome-navlinks-items">MESSAGES</h2>
          </div>
        </Link>
        <div onClick={props.showPost} className="aHome-navlinks-items-link">
          <div className="aHome-navlinks-eachitems">
            <i className="bx bx-folder-plus aHome-navlinks-icons"></i>
            <h2 className="aHome-navlinks-items">POST</h2>
          </div>
        </div>
        <Link
          onClick={(e) => redirect(e, `works`)}
          className="aHome-navlinks-items-link"
        >
          <div className="aHome-navlinks-eachitems">
            <i className="bx bx-briefcase aHome-navlinks-icons"></i>
            <h2 className="aHome-navlinks-items">ORDERS</h2>
          </div>
        </Link>
        <Link
          onClick={(e) => redirect(e, `profile/${auth.artistData.artistId}`)}
          className="aHome-navlinks-items-link"
        >
          <div className="aHome-navlinks-eachitems">
            <i className="bx bx-user-circle aHome-navlinks-icons"></i>
            <h2 className="aHome-navlinks-items">{auth.artistData.fname}</h2>
          </div>
        </Link>
      </div>
      <Link
        onClick={(e)=>handleLogout(e)}
        className="aHome-navlinks-items-link"
      >
        <div className="aHome-navlinks-bottomitems">
          <i className="bx bx-cog aHome-navlinks-icons"></i>
          <h2 className="aHome-navlinks-items">LOGOUT</h2>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
