import { combineReducers } from 'redux';

import user from './user';

const createRootReducer = () =>
  combineReducers({
    user,
  });

export default createRootReducer;
