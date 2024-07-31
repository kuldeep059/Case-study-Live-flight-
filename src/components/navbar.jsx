// src/components/Navbar.jsx
import React from "react";
import logo from "../images/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="/about">
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="/faq">
            <span>FAQ</span>
          </a>
        </li>
        <li>
          <a href="/contact">
            <span>Contact Us</span>
          </a>
        </li>
        {/* Add more links as needed */}
      </ul>
      <button className="sign-in">Sign In</button>
    </nav>
  );
}

export default Navbar;

