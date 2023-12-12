
import React,{ useContext, useState} from 'react'
import '../styles/artistSignup.css'
import Input from '../../shared/components/UIElements/Input';
import { AuthContext } from '../../shared/contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function ArtistSignup() {
  const auth = useContext(AuthContext)
  const history = useHistory()

  // state to store the signup form input values
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      errortext:
        "atleast 6 characters, 1 number ,alphabet and 1 special character",
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

  const signupHandler = async (e) => {
    e.preventDefault()

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/artists/signup`, values)
      .then((response) => {
        console.log(response.data)
        auth.artistLogIn(response.data)
        history.push("/")
      })
      .catch((error) => {
        console.log("error:", error)
      })
  }

  const toLogin = (e) => {
    history.push("/auth")
  }

  return (
    <div className="artist-page row">
      <div className="artist-signupPage  col-lg-6 col-sm-12">
        <div className="artist-signupItems">
          <h1 className="artist-heading">G R A B - A R T S</h1>
          <h3 className="artist-head">SIGNUP AS ARTIST</h3>

          <form
            className="artist-signupForm "
            action=""
            onSubmit={signupHandler}
          >
            <div className="row justify-content-center">
              <div className="col-xs-12">
                {signupDatas.map((input) => (
                  <Input
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChangeHandler}
                  >
                  </Input>
                ))}
              </div>
            </div>
            <button className="artist-signUpBtn" type="submit">
              S I G N U P
            </button>
          </form>

          <div className="artist-medias">
            <i className="social fa-brands fa-google"></i>
            <i className="social fa-brands fa-facebook"></i>
            <i className="social fa-brands fa-twitter"></i>
          </div>

          <hr />
          <button onClick={toLogin} className="artist-loginBtn">
            L O G I N
          </button>
          <button className="artist-signUpBtn">WORK AS AN ARTIST</button>
        </div>
      </div>
    </div>
  )
}

export default ArtistSignup
