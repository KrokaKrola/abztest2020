import React from 'react';
import useUsers from '../../hooks/useUsers';
import User from '../../components/User';
import { useAppState } from '../../store/app-state';
import { useTransition } from 'react-spring';
import { Spinner } from 'react-bootstrap';

const Users = () => {
  const [{ page, users }, dispatch] = useAppState();
  const [buttonState, isLoading] = useUsers(page.number, page.reset);

  const transitions = useTransition(users, item => item.id, {
    from: { opacity: 0, transform: 'translate3d(0, -10px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -10px, 0)' }
  });
  const clickHandler = () => {
    dispatch({
      type: 'SET_PAGE',
      page: { number: page.number + 1, reset: false }
    });
  };

  return (
    <figure className="Users" id="users">
      <div className="container">
        <h2 className="section-header">Our cheerful users</h2>
        <span className="subinfo">
          Attention! Sorting users by registration date
        </span>
        <div className="Users__grid">
          {!!users.length &&
            transitions.map(({ item, key, props }) => (
              <User user={item} key={key} style={props} />
            ))}
        </div>
        {buttonState && (
          <button
            className="btn"
            disabled={isLoading}
            onClick={() => clickHandler()}
          >
            Show more
          </button>
        )}
      </div>
    </figure>
  );
};

export default Users;
