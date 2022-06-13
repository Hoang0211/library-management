import { combineReducers } from 'redux';

import user from './user';
import editUser from './editUser';
import authors from './authors';
import searchAuthors from './searchAuthors';
import authorDetails from './authorDetails';
import addAuthor from './addAuthor';
import editAuthor from './editAuthor';
import deleteAuthor from './deleteAuthor';
import books from './books';
import searchBooks from './searchBooks';
import bookDetails from './bookDetails';
import addBook from './addBook';
import editBook from './editBook';
import deleteBook from './deleteBook';
import getBorrows from './getBorrows';
import borrow from './borrow';
import returnBook from './return';

const createRootReducer = () =>
  combineReducers({
    user,
    editUser,
    authors,
    searchAuthors,
    authorDetails,
    addAuthor,
    editAuthor,
    deleteAuthor,
    books,
    searchBooks,
    bookDetails,
    addBook,
    editBook,
    deleteBook,
    getBorrows,
    borrow,
    returnBook,
  });

export default createRootReducer;
