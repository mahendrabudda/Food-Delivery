import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login')

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className='login-popup-inputs'>
          {currState === "Login" ? null : <input type="text" placeholder='your name' required />}
          <input type='email' placeholder='your email' required />
          <input type='password' placeholder='password' required />
        </div>

        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing i will agree the terms and conditions</p>
        </div>

        {
          currState === "Login" ? (
            <p>Create New Account? <span onClick={() => setCurrState("Sign Up")}> Click here </span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}> Login </span> </p>
          )
        }
      </form>
    </div>
  )
}

export default LoginPopup
