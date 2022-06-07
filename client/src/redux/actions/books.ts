import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_ALL_BOOK_REQUEST,
  GET_ALL_BOOK_SUCCESS,
  GET_ALL_BOOK_FAILURE,
  CLEAR_GET_ALL_BOOK_ERROR,
} from '../../constants/bookConstants';
import { BooksActions, Book, isAxiosError } from '../../types';

export function getAllBookRequest(): BooksActions {
  return {
    type: GET_ALL_BOOK_REQUEST,
  };
}

export function getAllBookSuccess(books: Book[]): BooksActions {
  return {
    type: GET_ALL_BOOK_SUCCESS,
    payload: {
      books,
    },
  };
}

export function getAllBookFailure(error: Error): BooksActions {
  return {
    type: GET_ALL_BOOK_FAILURE,
    payload: {
      error,
    },
  };
}

export function getAllBook() {
  return async (dispatch: Dispatch) => {
    dispatch(getAllBookRequest());
    try {
      const res = await axios.get('http://localhost:5000/api/v1/books');
      const books = res.data;
      return dispatch(getAllBookSuccess(books));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getAllBookFailure(err));
      }
    }
  };
}

export function clearGetAllBookError(): BooksActions {
  return {
    type: CLEAR_GET_ALL_BOOK_ERROR,
  };
}
