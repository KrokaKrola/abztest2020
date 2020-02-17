import {SET_NEXT_PAGE, SET_USERS, CLEAN_USERS} from '../../constants/users';

export default (state = {
  users: [], nextPage: {
    link: null,
    regId: null,
  },
}, action) => {
  switch (action.type) {
    case SET_NEXT_PAGE:
      return {
        ...state,
        nextPage: {
          ...state.nextPage,
          ...action.nextPage,
        },
      };
    case CLEAN_USERS:
      return {
        ...state,
        users: [],
      };
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    default:
      return state;
  }
}