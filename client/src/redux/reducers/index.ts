import { combineReducers } from 'redux';

import user from './user';
import author from './author';

const createRootReducer = () =>
  combineReducers({
    user,
    author,
  });

export default createRootReducer;
