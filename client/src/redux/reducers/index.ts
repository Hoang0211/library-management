import { combineReducers } from 'redux';

import user from './user';
import editUser from './editUser';

import books from './books';
import searchBooks from './searchBooks';
import getBookDetails from './getBookDetails';
import addBook from './addBook';
import editBook from './editBook';
import deleteBook from './deleteBook';

import authors from './authors';
import searchAuthors from './searchAuthors';
import authorDetails from './authorDetails';
import addAuthor from './addAuthor';
import editAuthor from './editAuthor';
import deleteAuthor from './deleteAuthor';

import getBorrows from './getBorrows';
import borrow from './borrow';
import returnBook from './return';

const createRootReducer = () =>
  combineReducers({
    user,
    editUser,

    books,
    searchBooks,
    getBookDetails,
    addBook,
    editBook,
    deleteBook,

    authors,
    searchAuthors,
    authorDetails,
    addAuthor,
    editAuthor,
    deleteAuthor,

    getBorrows,
    borrow,
    returnBook,
  });

export default createRootReducer;
