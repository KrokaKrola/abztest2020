import React from 'react';
import logo from '../../assets/logo.svg';
import burger from '../../assets/menu-icon.svg';
import { Link } from 'react-scroll';

const Header = ({ clickHandler }) => {
  return (
    <header className="Header">
      <div className="container">
        <a href="index.html" className="Header__logo" title="logo">
          <img src={logo} alt="" />
          <span>logo</span>
        </a>
        <nav className="Header__nav">
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-59.99}
            duration={500}
            to="about"
            className="Header__nav-item"
            onClick={() => clickHandler(false)}
          >
            About me
          </Link>
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            to="footer"
            className="Header__nav-item"
            onClick={() => clickHandler(false)}
          >
            Relationships
          </Link>
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            to="requirements"
            className="Header__nav-item"
            onClick={() => clickHandler(false)}
          >
            Requirements
          </Link>
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            to="users"
            className="Header__nav-item"
            onClick={() => clickHandler(false)}
          >
            Users
          </Link>
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            to="register"
            className="Header__nav-item"
            onClick={() => clickHandler(false)}
          >
            Sign up
          </Link>
        </nav>
        <span className="burger" id="burger" onClick={() => clickHandler(true)}>
          <img src={burger} alt="" />
        </span>
      </div>
    </header>
  );
};

export default Header;
