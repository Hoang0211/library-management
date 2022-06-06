import { combineReducers } from 'redux';

import user from './user';
import authors from './authors';
import authorDetails from './authorDetails';
import addAuthor from './addAuthor';
import deleteAuthor from './deleteAuthor';

const createRootReducer = () =>
  combineReducers({
    user,
    authors,
    authorDetails,
    addAuthor,
    deleteAuthor,
  });

export default createRootReducer;
