import React from 'react';
import './Navbar.css';
import navlogo from '../../Assets/nav-logo.svg';
import navProfile from '../../Assets/nav-profile.svg'; // ✅ Correct import

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="Logo" />
      <img src={navProfile} alt="Profile" />
    </div>
  );
};

export default Navbar;
