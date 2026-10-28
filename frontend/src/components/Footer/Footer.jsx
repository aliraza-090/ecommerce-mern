import React from "react";
import "./Footer.css";

// Correct paths — since files are inside src/components/assets/
import logoBig from "../assets/logo_big.png";
import instagramIcon from "../assets/instagram_icon.png";
import pinterestIcon from "../assets/pintester_icon.png"; // check spelling of file name carefully
import whatsappIcon from "../assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoBig} alt="Shopper Logo" className="footer-logo-img" />
            <p className="brand-name">SHOPPER</p>
          </div>

          <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <div className="footer-social">
            <div className="footer-icon-container">
              <img src={instagramIcon} alt="Instagram" />
            </div>
            <div className="footer-icon-container">
              <img src={pinterestIcon} alt="Pinterest" />
            </div>
            <div className="footer-icon-container">
              <img src={whatsappIcon} alt="WhatsApp" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <hr />
          <p>Copyright © 2025 - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
