import React from 'react';
import Logo from '../../components/Logo';
import burger from '../../assets/menu-icon.svg';
import { Link } from 'react-scroll';

const Header = ({ clickHandler }) => {

  const burgerClick = () => {
    clickHandler(true);
    document.querySelector('body').classList.toggle('no-scroll');
  }

  return (
    <header className="Header">
      <div className="container">
        <a href="index.html" className="Header__logo" title="TESTTASK">
          <Logo />
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
        <span className="burger" id="burger" onClick={burgerClick}>
          <img src={burger} alt="" />
        </span>
      </div>
    </header>
  );
};

export default Header;
