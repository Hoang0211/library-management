import { combineReducers } from 'redux';

import user from './user';
import authors from './authors';
import authorDetails from './authorDetails';
import addAuthor from './addAuthor';
import editAuthor from './editAuthor';
import deleteAuthor from './deleteAuthor';
import books from './books';
import addBook from './addBook';

const createRootReducer = () =>
  combineReducers({
    user,
    authors,
    authorDetails,
    addAuthor,
    editAuthor,
    deleteAuthor,
    books,
    addBook,
  });

export default createRootReducer;
