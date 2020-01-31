import React from 'react';
import useUsers from '../../hooks/useUsers';
import { User } from '../../components/User';

const Users = () => {
  const users = useUsers(1, 6);
  return (
    <figure className="Users">
      <div className="container">
        <h2 className="section-header">Our cheerful users</h2>
        <span className="subinfo">
          Attention! Sorting users by registration date
        </span>
        <div className="Users__grid">
          {!!users.length &&
            users.map(user => <User key={user.id} user={user} />)}
        </div>
        <button className="btn">Show more</button>
      </div>
    </figure>
  );
};

export default Users;
