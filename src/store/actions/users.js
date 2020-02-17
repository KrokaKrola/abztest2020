import { CLEAN_USERS, SET_NEXT_PAGE, SET_USERS } from '../constants/users';
import { instance } from '../../service/settings';
import { isMobile } from "react-device-detect";

export const setNextPageAction = (nextPage) => {
  return {
    type: SET_NEXT_PAGE,
    nextPage,
  };
};

export const cleanUsersAction = () => {
  return {
    type: CLEAN_USERS,
  };
};

export const setUsersAction = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const fetchUsers = () => {
  return function (dispatch) {
    instance
    .get(`/users?page=1&count=6`).then(result => {
      dispatch(setUsersAction(result.data.users));
    })
  }
};