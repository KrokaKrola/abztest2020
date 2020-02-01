import React, { useRef } from 'react';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { useTransition, animated } from 'react-spring';
import { Link } from 'react-scroll';
import Logo from '../Logo';

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
  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={props}
          className={`MobileMenu`}
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
              >
                Relationships
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to="users"
              >
                Users
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to="register"
              >
                Sign up
              </Link>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-59.99}
                duration={500}
                to="requirements"
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
