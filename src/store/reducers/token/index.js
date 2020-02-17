import {SET_TOKEN} from '../../constants/token';

export default (state = { token: null }, action) => {
  if (action.type === SET_TOKEN) {
    return {
      ...state,
      token: action.token,
    };
  } else { return state; }
}