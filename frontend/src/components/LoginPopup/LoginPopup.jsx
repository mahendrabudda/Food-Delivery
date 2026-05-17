import React, { useState, useEffect, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext'; 

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { setToken, url } = useContext(StoreContext); 

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      console.log(response.data);

      if (response.data.success) {
        // ✅ Save token both globally and locally
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        alert("✅ User authenticated successfully!");
        setShowLogin(false);
      } else {
        alert("⚠️ " + response.data.message);
      }
    } catch (error) {

  console.log("FULL ERROR:", error);

  console.log("RESPONSE:", error.response);

  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
}
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className='login-popup-inputs'>
          {currState === "Login" ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>

        <button type='submit'>
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and conditions</p>
        </div>

        {currState === "Login" ? (
          <p>Create new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
