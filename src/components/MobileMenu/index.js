import React, { useRef } from 'react';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { useTransition, animated } from 'react-spring';
import { Link } from 'react-scroll';
import Logo from '../Logo';
import { isMobile, isIOS } from 'react-device-detect';

const MobileMenu = ({ mobileMenuState, setMobileMenuState }) => {
  const mobileMenuRef = useRef(null);
  const outsideMarker = useOutsideAlerter(mobileMenuRef);
  if (mobileMenuState && outsideMarker) {
    setMobileMenuState(false);
  }
  const transitions = useTransition(mobileMenuState, null, {
    from: { transform: 'translate3d(-100%, 0,0)' },
    enter: { transform: 'translate3d(0%, 0,0)' },
    leave: { transform: 'translate3d(-100%, 0,0)' }
  });

  const clickHandler = () => {
    setMobileMenuState(false);
  };

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={props}
          className={`MobileMenu ${isMobile && isIOS ? 'iosFix' : ''}`}
          ref={mobileMenuRef}
        >
          <div className="MobileMenu__wrapper">
            <div className="MobileMenu__logo">
              <a href="index.html">
                <Logo />
              </a>
            </div>
            <nav className="MobileMenu__nav-block">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to="about"
                onClick={() => setMobileMenuState(false)}
              >
                About me
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to="footer"
                onClick={clickHandler}
              >
                Relationships
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-39.99}
                duration={500}
                to="users"
                onClick={clickHandler}
              >
                Users
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-39.99}
                duration={500}
                to="register"
                onClick={clickHandler}
              >
                Sign up
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-39.99}
                duration={500}
                to="requirements"
                onClick={clickHandler}
              >
                Terms and Conditions
              </Link>
            </nav>
            <nav className="MobileMenu__nav-block">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                How it works
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Partnership
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Help
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Leave testimonial
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Contact us
              </Link>
            </nav>
            <nav className="MobileMenu__nav-block">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Articles
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Our news
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Testimonials
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Licenses
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to=""
                onClick={clickHandler}
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </animated.div>
      )
  );
};

export default MobileMenu;
