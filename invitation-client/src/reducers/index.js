import { combineReducers } from 'redux';
import event from './eventReducer';
import user from './userReducer';

export default combineReducers ({
  event, user
})