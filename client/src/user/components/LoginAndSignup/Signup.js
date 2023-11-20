import React,{ useContext, useState,useEffect, useCallback} from 'react'
import '../../styles/Signup.css'
// import Logo from '../../../shared/components/UIElements/Logo';
import Input from '../../../shared/components/UIElements/Input';
import { AuthContext } from '../../../shared/contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import axios from 'axios'

function Signup() {

  const auth = useContext(AuthContext)
  const history = useHistory()
  const [datas,setDatas]=useState()

  const handleToggle = () => {
    const passwordField = document.getElementById("pass")
    const toggleIcon = document.querySelector(".toggle-pass")
  
    if (passwordField.type === "password") {
      passwordField.type = "text"
      toggleIcon.classList.remove("fa-eye")
      toggleIcon.classList.add("fa-eye-slash")
    } else {
      passwordField.type = "password"
      toggleIcon.classList.remove("fa-eye-slash")
      toggleIcon.classList.add("fa-eye")
    }
  }

  

  // state to store the signup form input values
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword:""
  })

  // array of items for the input field element
  const signupDatas = [
    {
      id: "1",
      name: "fname",
      type: "text",
      placeholder: "first name",
      errortext: "please provide a first name",
      required: true,
    },
    {
      id: "2",
      name: "lname",
      type: "text",
      placeholder: "last name",
    },
    {
      id: "3",
      name: "mobile",
      type: "text",
      placeholder: "mobile number",
      errortext: "enter a valid mobile number",
      pattern: `^[0-9]{10}$`,
      required: true,
    },
    {
      id: "4",
      name: "email",
      type: "email",
      placeholder: "email address",
      errortext: "enter a valid email",
      pattern: "^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$",
      required: true,
    },
    {
      id: "5",
      name: "password",
      type: "password",
      placeholder: "password",
      errortext: "atleast 6 characters, 1 number ,alphabet and 1 special character",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[$@$!%*?&])[A-Za-z0-9@$!%*?&]{6,20}$`,
      required: true,
    },
    {
      id: "6",
      name: "confirmPassword",
      type: "password",
      placeholder: "confirm password",
      errortext: "passwords must be the same",
      pattern: values.password,
      required: true,
    },
  ]

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  
  const handleCallbackResponse = useCallback(
    (res) => {

      let userData = jwt_decode(res.credential)

      let data = {
        fname: userData.given_name,
        lname: userData.family_name,
        email: userData.email,
        password: "@google" + userData.sub,
        googleUser: true,
        token: res.credential,
      }
      setDatas(data)
    },
    [setDatas])
  

  
  
  
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "643581378616-rb037imkgofkpu41uidjqk21dh5n3v6t.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    })

  }, [handleCallbackResponse])





  const signupHandler = useCallback (async(e) => {
    let signupDetails;
    if (datas)
    {
      signupDetails = {
        fname: datas.fname,
        lname: datas.lname,
        email: datas.email,
        password:datas.password
      }
    }else{
      e.preventDefault();
      signupDetails=values
    }
    console.log(signupDetails)

    axios
      .post(process.env.REACT_APP_BACKEND_URL+"/users/signup", signupDetails)
      .then((response) => {
        console.log(response.data)
        auth.userLogIn(response.data)
        history.push('/users')
      })
      .catch((error) => {
        console.log("error:", error)
      })
  },[datas,auth,history,values])

useEffect(() => {
  if (datas) {
    signupHandler()
  }
}, [datas, signupHandler])
  
  
  
  
  
  
  
  const toLogin = (e) => {
    history.push('/auth')
  }  

  
  return (
    <div id="popup" className="page row">
      <div className="signupPage  col-lg-6 col-sm-12">
        <div className="signupItems">
          <h3 className="head">SIGNUP</h3>

          <form className="signupForm " action="" onSubmit={signupHandler}>
            <div className="row justify-content-center">
              <div className="col-xs-12">
                {signupDatas.map((input) => (
                  <Input
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChangeHandler}
                  >
                    {input.type === "password" && (
                      <i
                        className="toggle-pass fas fa-eye"
                        onClick={handleToggle}
                      ></i>
                    )}
                  </Input>
                ))}
              </div>
            </div>
            <button className="signUpBtn" type="submit">
              S I G N U P
            </button>
          </form>

          <div id="signInDiv" className="medias"></div>

          <hr />
          <button onClick={toLogin} className="loginBtn">
            L O G I N
          </button>
          <button className="signUpBtn">WORK AS AN ARTIST</button>
        </div>
      </div>
    </div>
  )
 
}

export default Signup
