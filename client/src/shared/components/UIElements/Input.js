import React, { useState }  from 'react'

import './Input.css'

function Input(props) {


  const [touched, setTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
 
  
  const togglePassVisibility = () => {
    setShowPassword(showPassword =>!showPassword)
  }

  const touchHandler = () => {
    setTouched(true)
  }

  return (
    <div className="common-input-items">
      <input
        className={"common-input-field"}
        name={props.name}
        pattern={props.pattern}
        type={showPassword ? "text" : props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.onChange}
        onBlur={touchHandler}
        touched={touched.toString()}
      />
      {props.type === "password" && (
        <i
          className={`toggle-pass fas ${
            showPassword ? "fa-eye-slash" : "fa-eye"
          }`}
          onClick={togglePassVisibility}
        ></i>
      )}
      <span className="validation-error-message">{props.errortext}</span>
    </div>
  )
}

export default Input;