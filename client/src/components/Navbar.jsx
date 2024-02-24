import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo/main_logo.svg";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="links">
          <div className="link">
            <a href="#">Home</a>
          </div>
          <div className="link">
            <a href="#rewards-section">Rewards</a>
          </div>
          <div className="link">
            <a href="#timeline">Recycle</a>
          </div>
          <div className="link">
            <a href="#contact-section">Contact Us</a>
          </div>
          <div class="navbaar-button-container">
            <a href="/signin">
              <button class="navbar-button">Sign In</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;