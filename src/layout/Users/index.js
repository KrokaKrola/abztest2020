import React from 'react';
import useUsers from '../../hooks/useUsers';
import User from '../../components/User';
import { useTransition } from 'react-spring';
import { connect } from 'react-redux';
import { setNextPageAction, setUsersAction, fetchUsers } from '../../store/actions/users';

const Users = ({ users, nextPage, setNextPageAction, setUsersAction, fetchUsers }) => {
  const [localNextPage, pageStatus, isLoading] = useUsers(nextPage, setUsersAction);
  fetchUsers();
  const transitions = useTransition(users, item => item.id, {
    from: { opacity: 0, transform: 'translate3d(0, -10px, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -10px, 0)' },
  });

  const clickHandler = () => {
    setNextPageAction({ link: localNextPage });
  };

  return (
    <figure className="Users" id="users">
      <div className="container">
        <h2 className="section-header">Our cheerful users</h2>
        <span className="subinfo">
          Attention! Sorting users by registration date
        </span>
        <div
          className="Users__grid"
          style={users.length === 0 ? { minHeight: '0' } : {}}
        >
          {!!users.length ? (
            transitions.map(({ item, key, props }) => (
              <User user={item} key={key} style={props}/>
            ))
          ) : (
            <p
              style={{
                textAlign: 'center',
                fontWeight: '400',
                width: '100%',
              }}
            >
              There's no users right now :(
            </p>
          )}
        </div>
        {pageStatus.total_pages !== pageStatus.page && !!users.length && (
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

function mapState (state) {
  return {
    users: state.users.users,
    nextPage: state.users.nextPage,
  };
}

function mapDispatch () {
  return {
    setNextPageAction,
    setUsersAction,
    fetchUsers
  };
}

export default connect(mapState, mapDispatch)(Users);
