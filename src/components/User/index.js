import React from "react";
import TextOverflowTooltip from "../TextOverflowTooltip";
import PropTypes from 'prop-types';

const User = ({ user }) => {
  const { photo, name, position, email, phone } = user;

  return (
    <div className="User" >
      <div className="User__avatar">
        <img src={photo || "https://via.placeholder.com/70"} alt={name} />
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
        className="User__email text-overflow-tooltip"
      >
        {email}
      </TextOverflowTooltip>
      <span className="User__phone">{phone}</span>
    </div>
  );
};

User.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.string
}

export default User;