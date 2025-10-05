import React, { useState, useContext, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart from '../assets/cart_icon.png';
import dropdown_icon from '../assets/dropdown_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);

  const menuRef = useRef();
  const dropdownRef = useRef();

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
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart} alt="cart icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
