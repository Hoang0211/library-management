import { combineReducers } from 'redux';

import display from './display';

import user from './user';
import editUser from './editUser';

import getBooks from './getBooks';
import searchBooks from './searchBooks';
import getBookDetails from './getBookDetails';
import addBook from './addBook';
import editBook from './editBook';
import deleteBook from './deleteBook';

import getAuthors from './getAuthors';
import searchAuthors from './searchAuthors';
import getAuthorDetails from './getAuthorDetails';
import addAuthor from './addAuthor';
import editAuthor from './editAuthor';
import deleteAuthor from './deleteAuthor';

import getBorrows from './getBorrows';
import borrowBooks from './borrowBooks';
import returnBook from './return';

const createRootReducer = () =>
  combineReducers({
    display,

    user,
    editUser,

    getBooks,
    searchBooks,
    getBookDetails,
    addBook,
    editBook,
    deleteBook,

    getAuthors,
    searchAuthors,
    getAuthorDetails,
    addAuthor,
    editAuthor,
    deleteAuthor,

    getBorrows,
    borrowBooks,
    returnBook,
  });

export default createRootReducer;
