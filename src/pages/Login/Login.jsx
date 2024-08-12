import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'

const Login = () => {

  const [CurrState,setCurrState] = useState("Sign up");


  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className="logo" />
        <form className='login-form'>
          <h2>{CurrState}</h2>
          {CurrState === "Sign up"?<input type="text" placeholder='username' className="form-input" required/>:null}
          <input type="email" placeholder='Email address' className="form-input" required/>
          <input type="password" placeholder='password' className="form-input" required/>
          <button type='submit'>{CurrState === "Sign up"?"Create account":"Login now"}</button>
          <div className="login-term">
            <input type="checkbox" />
            <p>Agree to the terms of use & privasy policy. </p>
          </div>
          <div className="login-forgot">
            {
              CurrState === "Sign up"
              ?<p className="login-toggle">Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span> </p>
              :<p className="login-toggle">Create an account <span onClick={()=>setCurrState("Sign up")}>clilck here</span> </p>
            }
          </div>
        </form>
    </div>
  )
}

export default Login
