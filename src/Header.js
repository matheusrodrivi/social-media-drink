import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="social-header">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li className="header-nav-item">
            <a href="/all-drinks" className="header-nav-link">
              <i className="icon-home"></i>
              <span>Inicio</span>
            </a>
          </li>
          <li className="header-nav-item">
            <a href="/drink-list" className="header-nav-link">
              <i className="icon-profile"></i>
              <span>Perfil</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;