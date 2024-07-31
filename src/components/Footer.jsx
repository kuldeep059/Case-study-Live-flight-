// src/components/Footer.jsx
import React from 'react';
import logo from '../images/logo.png';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="footer-column">
        <h4>COMPANY</h4>
        <a href="/link1">About Us</a>
        <a href="/link2">Our People</a>
        <a href="/link3">Policy</a>
      </div>
      <div className="footer-column">
        <h4>SUPPORT</h4>
        <a href="/link4">Special Assistance</a>
        <a href="/link5">Add-Ons</a>
        <a href="/link6">FAQ'S</a>
      </div>
      <div className="footer-column">
        <h4>QUICK LINKS</h4>
        <a href="/link7">Download App</a>
        <a href="/link8">Flight Schedule</a>
        <a href="/link9">Web check-in advisory</a>
      </div>
    </footer>
  );
}

export default Footer;
