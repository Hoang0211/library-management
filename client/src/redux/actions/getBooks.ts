import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  CLEAR_GET_ALL_BOOKS_ERROR,
} from '../../constants/bookConstants';
import { GetBooksActions, Book, isAxiosError } from '../../types';

export function getAllBooksRequest(): GetBooksActions {
  return {
    type: GET_ALL_BOOKS_REQUEST,
  };
}

export function getAllBooksSuccess(books: Book[]): GetBooksActions {
  return {
    type: GET_ALL_BOOKS_SUCCESS,
    payload: {
      books,
    },
  };
}

export function getAllBooksFailure(error: Error): GetBooksActions {
  return {
    type: GET_ALL_BOOKS_FAILURE,
    payload: {
      error,
    },
  };
}

export function getAllBooks() {
  return async (dispatch: Dispatch) => {
    dispatch(getAllBooksRequest());
    try {
      const res = await axios.get('http://localhost:5000/api/v1/books');
      const books = res.data;
      return dispatch(getAllBooksSuccess(books));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getAllBooksFailure(err));
      }
    }
  };
}

export function clearGetAllBooksError(): GetBooksActions {
  return {
    type: CLEAR_GET_ALL_BOOKS_ERROR,
  };
}
