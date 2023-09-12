import React, { useContext, useState } from 'react'
import "../styles/artistLogin.css"
import Input from '../../shared/components/UIElements/Input';
import { AuthContext } from '../../shared/contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function ArtistLogin() {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [error, setError] = useState(null)
   const isArtistLogin = true
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const inputItemDatas = [
    {
      id: "1",
      name: "email",
      type: "email",
      placeholder: "email address",
      errortext: "please enter a valid email address",
      required: true,
    },
    {
      id: "pass",
      name: "password",
      type: "password",
      placeholder: "password",
      errortext: "wrong password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[$@$!%*?&])[A-Za-z0-9@$!%*?&]{6,20}$`,
      required: true,
    },
  ]

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/artists/login", values)
      .then((res) => {
        auth.artistLogIn(res.data)
        console.log(res.data)
        history.push("/")
      })
      .catch((error) => {
        console.log(error.response.data.message)
        setError(error.response.data.message)
      })
  }


  
  return (
    <React.Fragment>
      <div className="artist-loginPage">
        <div className="artist-loginItems">
          <h1 className="artist-heading">G R A B - A R T S</h1>
          <h3 className="artist-login-page-subheading">LOGIN AS ARTIST</h3>
          <form className="artist-loginForm" action="" onSubmit={submitHandler}>
            {inputItemDatas.map((input, i) => (
              <div className="artist-input-field-and-icon" key={i}>
                <Input
                  {...input}
                  value={values[input.name]}
                  onChange={onChangeHandler}
                  isArtistLogin={isArtistLogin}
                ></Input>
              </div>
            ))}
            {error && <p style={{color:'red'}}>{error }</p>}
            <button className="artist-loginBtn" type="submit">
              L O G I N
            </button>
          </form>
          <a className="artist-forgot" href="/forgot-password">
            forgot ?
          </a>
          <div className="artist-medias">
            <i className="social fa-brands fa-google"></i>
            <i className="social fa-brands fa-facebook"></i>
            <i className="social fa-brands fa-twitter"></i>
          </div>
          <hr />
          <a href={"/artist-signup"}>
            <button className="artist-signUpBtn">CREATE ACCOUNT</button>
          </a>
          <button className="artist-signUpBtn">BECOME AN ARTIST</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ArtistLogin
