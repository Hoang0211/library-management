import { Dispatch } from 'redux';
import axios from 'axios';

import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  RESET_ADD_BOOK,
  CLEAR_ADD_BOOK_ERROR,
} from '../../constants/bookConstants';
import { AddBookActions, Book, isAxiosError } from '../../types';

export function addBookRequest(): AddBookActions {
  return {
    type: ADD_BOOK_REQUEST,
  };
}

export function addBookSuccess(): AddBookActions {
  return {
    type: ADD_BOOK_SUCCESS,
  };
}

export function addBookFailure(error: Error): AddBookActions {
  return {
    type: ADD_BOOK_FAILURE,
    payload: {
      error,
    },
  };
}

export function addBook(token: string, book: Partial<Book>) {
  return async (dispatch: Dispatch) => {
    dispatch(addBookRequest());
    try {
      await axios.post(
        `http://localhost:5000/api/v1/books/`,
        {
          isbn: book.isbn,
          title: book.title,
          description: book.description,
          authors: book.authors,
          publisher: book.publisher,
          publishedDate: book.publishedDate,
          category: book.category,
          numPage: book.numPage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch(addBookSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(addBookFailure(err));
      }
    }
  };
}

export function resetAddBook(): AddBookActions {
  return {
    type: RESET_ADD_BOOK,
  };
}

export function clearAddBookError(): AddBookActions {
  return {
    type: CLEAR_ADD_BOOK_ERROR,
  };
}
