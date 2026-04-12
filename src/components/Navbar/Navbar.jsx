import React, { useState, useContext, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart from '../assets/cart_icon.png';
import dropdown_icon from '../assets/dropdown_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuRef = useRef();
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // 🧠 Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 🔒 Logout function
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    alert('You have been logged out.');
    navigate('/'); // redirect to home page
  };

  const toggleDropdown = () => {
    menuRef.current.classList.toggle('nav-menu-visible');
    dropdownRef.current.classList.toggle('open'); // optional for icon animation
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      {/* Dropdown icon for mobile */}
      <img
        ref={dropdownRef}
        className="nav-dropdown"
        src={dropdown_icon}
        alt="dropdown"
        onClick={toggleDropdown}
      />

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link to="/">Shop</Link>
          {menu === 'shop' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('mens')}>
          <Link to="/mens">Man</Link>
          {menu === 'mens' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('womens')}>
          <Link to="/womens">Women</Link>
          {menu === 'womens' ? <hr /> : null}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link to="/kids">Kids</Link>
          {menu === 'kids' ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        {/* 🧾 Conditionally render Login or Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart} alt="cart icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
