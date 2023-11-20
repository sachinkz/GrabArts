import React, { useContext, useState,useEffect, useCallback } from 'react'
import "../../styles/Login.css"
import jwt_decode from 'jwt-decode'
import Input from '../../../shared/components/UIElements/Input';
import { AuthContext } from '../../../shared/contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const auth = useContext(AuthContext)
  const history = useHistory()
  const[error,setError]=useState(null)
  const[datas,setDatas]=useState(null)

  const [values, setValues] = useState({
    email: '',
    password:''
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
    setValues({...values,[e.target.name]: e.target.value})
  }



  const handleCallbackResponse = useCallback((res) => {

    let userData = jwt_decode(res.credential)

    let data = {
      email: userData.email,
      password: "@google" + userData.sub,
    }
    setDatas(data)
  },[setDatas])

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_ID,
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "standard",
      size: "large",
    }
    )
  }, [handleCallbackResponse])


  
  const submitHandler = useCallback((e) => {
    
    let loginDetails

    if (datas)
    {
      loginDetails = {
        email: datas.email,
        password: datas.password
      }
    } else
    {
      e.preventDefault()
      loginDetails=values
    }

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users/login", loginDetails)
      .then((res) => {
        console.log(res.data)
        auth.userLogIn(res.data)
        history.push("/users")
      })
      .catch((error) => {
        console.log(error.response.data.message)
        setError(error.response.data.message)
      })
},[history,values,datas,auth])

  useEffect(() => {
    if (datas) {
      submitHandler()
    }
  }, [datas,submitHandler])
  return (
    <React.Fragment>
      
      <div id='googlePopup' className="loginPage">
        <div className="loginItems">
          <div className="logo"></div>
          <h1 className="heading">G R A B - A R T S</h1>
          <h3 className='login-page-subheading'>LOGIN</h3>
          <form className="loginForm" action="" onSubmit={submitHandler}>
            {inputItemDatas.map((input, i) => (
              <div  key={i}>
                <Input
                  {...input}
                  value={values[input.name]}
                  onChange={onChangeHandler}
                ></Input>
              </div>
            ))}
            {error && <p>{error}</p>}
            <button className="loginBtn" type="submit">
              L O G I N
            </button>
          </form>
          <a className="forgot" href="/forgot-password">
            forgot ?
          </a>
          <div id='signInDiv' className="medias"> </div>
          <a href={"/signup"}>
            <button className="signUpBtn">CREATE ACCOUNT</button>
          </a>
          <button className="signUpBtn">BECOME AN ARTIST</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
