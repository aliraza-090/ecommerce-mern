import React from 'react'
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your name' />
          <input type="email" placeholder='Your email' />
          <input type="password" placeholder='enter your password' />

        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Already have an account? <span>Login here</span></p>
        <div className="loginsign-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing,  i agree to terms & use and privacy policy.</p>
        </div>

      </div>
    </div>
  )
}

export default LoginSignup
