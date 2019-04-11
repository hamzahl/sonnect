import { combineReducers } from 'redux';
import authReducer from './authReducer';
import friendReducer from './friendReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  friend: friendReducer,
  posts: postReducer,
  profile: profileReducer,
  errors: errorReducer
});
