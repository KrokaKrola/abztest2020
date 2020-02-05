import React, { useState, useEffect } from 'react';
import TextOverflowTooltip from '../TextOverflowTooltip';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

const User = ({ user, style }) => {
  const { photo, name, position, email, phone } = user;
  const [avatar, setAvatar] = useState(photo);

  useEffect(() => {
    function imageExists(url, callback) {
      var img = new Image();
      img.onload = function() {
        callback(true);
      };
      img.onerror = function() {
        callback(false);
      };
      img.src = url;
    }

    imageExists(photo, function(exists) {
      if (!exists) {
        setAvatar('https://via.placeholder.com/70');
      }
    });
  }, [photo]);

  return (
    <animated.div className="User" style={style}>
      <div className="User__avatar">
        <img src={avatar} alt={name} />
      </div>
      <TextOverflowTooltip
        popoverPlacement="bottom"
        maxWidth="100%"
        className="User__name text-overflow-tooltip"
      >
        {name}
      </TextOverflowTooltip>
      <span className="User__position">{position}</span>
      <TextOverflowTooltip
        popoverPlacement="bottom"
        maxWidth="100%"
        className="text-overflow-tooltip User__email"
      >
        {email}
      </TextOverflowTooltip>
      <span className="User__phone">{phone}</span>
    </animated.div>
  );
};

User.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.string
};

export default User;
