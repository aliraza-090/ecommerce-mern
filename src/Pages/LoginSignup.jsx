import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  // ✅ State for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle signup submit
  const handleSignup = async () => {
    try {
      const res = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert('Signup successful 🎉');
        localStorage.setItem('auth-token', data.token); // save JWT
      } else {
        alert(data.message || 'Signup failed ❌');
      }
    } catch (error) {
      console.error('❌ Signup error:', error);
      alert('Something went wrong! Please try again.');
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign up</h1>

        <div className="loginsignup-fields">
          {/* ✅ Added "name" attributes for state binding */}
          <input
            type="text"
            name="username"
            placeholder="Your name"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* ✅ Added onClick event for signup */}
        <button onClick={handleSignup}>Continue</button>

        <p className='loginsignup-login'>
          Already have an account? <span>Login here</span>
        </p>

        <div className="loginsign-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By continuing, I agree to the Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
 