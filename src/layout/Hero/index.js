import React from 'react';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <figure className="Hero" id="about">
      <div className="container">
        <h1>
          Test assignment <br />
          for Frontend
          <br /> Developer position
        </h1>
        <p>
          We kindly remind you that your test assignment should be submitted as
          a link to github/bitbucket repository.{' '}
          <span>
            Please be patient, we consider and respond to every application that
            meets minimum requirements. We look forward to your submission. Good
            luck! The photo has to scale in the banner area on the different
            screens
          </span>
        </p>
        <Link
          className="btn"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          to="register"
        >
          Sing up now
        </Link>
      </div>
    </figure>
  );
};

export default Hero;
