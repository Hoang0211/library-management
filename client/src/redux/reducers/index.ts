import { combineReducers } from 'redux';

import user from './user';
import authors from './authors';
import authorDetails from './authorDetails';
import addAuthor from './addAuthor';
import editAuthor from './editAuthor';
import deleteAuthor from './deleteAuthor';
import books from './books';

const createRootReducer = () =>
  combineReducers({
    user,
    authors,
    authorDetails,
    addAuthor,
    editAuthor,
    deleteAuthor,
    books,
  });

export default createRootReducer;
