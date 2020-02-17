import {combineReducers} from 'redux';
import modal from './modal';
import token from './token';
import users from './users';

export default combineReducers({
  modal,
  token,
  users,
})