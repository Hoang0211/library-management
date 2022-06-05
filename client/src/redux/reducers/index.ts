import { combineReducers } from 'redux';

import user from './user';
import authors from './authors';
import authorDetails from './authorDetails';

const createRootReducer = () =>
  combineReducers({
    user,
    authors,
    authorDetails,
  });

export default createRootReducer;
