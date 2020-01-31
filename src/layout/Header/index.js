import React from 'react';
import logo from '../../assets/logo.svg';

const Header = () => {
  return <header className="header">
    <div className="container">
      <a href="index.html" className="header__logo">
        <img src={logo} alt=""/>
        <svg 
        xmlns="http://www.w3.org/2000/svg"
        width="30px" height="20px">
          <path fillRule="evenodd"  fill="rgb(255, 255, 255)"
          d="M12.000,12.000 L10.000,12.000 L10.000,2.000 L8.000,2.000 L8.000,-0.000 L14.000,-0.000 L14.000,2.000 L12.000,2.000 L12.000,12.000 ZM4.000,12.000 L2.000,12.000 L2.000,2.000 L-0.000,2.000 L-0.000,-0.000 L6.000,-0.000 L6.000,2.000 L4.000,2.000 L4.000,12.000 Z"/>
        </svg>
        <span>TESTTASK</span>
      </a>
      <nav className="header__nav">
        <a href="#section1" className="header__nav-item">About me</a>
        <a href="#section1" className="header__nav-item">Relationships</a>
        <a href="#section1" className="header__nav-item">Requirements</a>
        <a href="#section1" className="header__nav-item">Users</a>
        <a href="#section1" className="header__nav-item">Sign up</a>
      </nav>
    </div>
  </header>;
};

export default Header;
