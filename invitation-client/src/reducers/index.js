import { combineReducers } from 'redux';
import event from './eventReducer';
import user from './userReducer';
import session from './sessionReducer';

export default combineReducers ({
  event, user, session
})