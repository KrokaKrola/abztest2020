import React from 'react';
import aboutMain from '../../assets/about.svg';
import { Link } from 'react-scroll';

const About = () => {
  return (
    <figure className="About" id="requirements">
      <div className="container">
        <h2 className="section-header">Let's get acquainted</h2>
        <div className="About__wrapper">
          <div className="About__img">
            <img src={aboutMain} alt="" />
          </div>
          <div className="About__info">
            <h3>I am cool frontend developer</h3>
            <p>
              We will evaluate how clean your approach to writing CSS and
              Javascript code is. You can use any CSS and Javascript 3rd party
              libraries without any restriction.
            </p>
            <p>
              If 3rd party css/javascript libraries are added to the project via
              bower/npm/yarn you will get bonus points. If you use any task
              runner (gulp/webpack) you will get bonus points as well. Slice
              service directory page P​SD mockup​ into HTML5/CSS3.
            </p>
            <Link
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              to="register"
              className="btn btn--flat"
            >
              Sing up now
            </Link>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default About;
