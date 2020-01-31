import React from "react";
import useUsers from "../../hooks/useUsers";
import { User } from "../../components/User";
import { useAppState } from "../../store/app-state";

const Users = () => {
  const [{ page, users }, dispatch] = useAppState();
  const buttonState = useUsers(page.number, page.reset);

  const clickHandler = () => {
    dispatch({
      type: "SET_PAGE",
      page: { number: page.number + 1, reset: false }
    });
  };

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
        {buttonState && (
          <button className="btn" onClick={() => clickHandler()}>
            Show more
          </button>
        )}
      </div>
    </figure>
  );
};

export default Users;
