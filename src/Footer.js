import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="social-footer">
      <nav className="footer-nav">
        <ul className="footer-nav-list">
          <li className="footer-nav-item">
            <a href="/all-drinks" className="footer-nav-link">
              <i className="icon-home"></i>
              <span>Home</span>
            </a>
          </li>
          <li className="footer-nav-item">
            <a href="/drink-list" className="footer-nav-link">
              <i className="icon-profile"></i>
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;