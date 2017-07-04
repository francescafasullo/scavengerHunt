import { combineReducers } from 'redux';
import authReducer from './authReducer';
import myAccountReducer from './myAccountReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  myAccount: myAccountReducer
});

export default rootReducer;
