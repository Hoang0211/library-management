import { combineReducers } from 'redux';

import user from './user';
import authors from './authors';
import authorDetails from './authorDetails';
import addAuthor from './addAuthor';
import editAuthor from './editAuthor';
import deleteAuthor from './deleteAuthor';
import books from './books';
import bookDetails from './bookDetails';
import addBook from './addBook';
import editBook from './editBook';
import deleteBook from './deleteBook';
import loans from './loans';
import loan from './loan';

const createRootReducer = () =>
  combineReducers({
    user,
    authors,
    authorDetails,
    addAuthor,
    editAuthor,
    deleteAuthor,
    books,
    bookDetails,
    addBook,
    editBook,
    deleteBook,
    loans,
    loan,
  });

export default createRootReducer;
