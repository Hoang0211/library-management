import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_BOOK_DETAILS_REQUEST,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_FAILURE,
  CLEAR_GET_BOOK_DETAILS_ERROR,
} from '../../constants/bookConstants';
import { BookDetailsActions, Book, isAxiosError } from '../../types';

export function getBookDetailsRequest(): BookDetailsActions {
  return {
    type: GET_BOOK_DETAILS_REQUEST,
  };
}

export function getBookDetailsSuccess(book: Book): BookDetailsActions {
  return {
    type: GET_BOOK_DETAILS_SUCCESS,
    payload: {
      book,
    },
  };
}

export function getBookDetailsFailure(error: Error): BookDetailsActions {
  return {
    type: GET_BOOK_DETAILS_FAILURE,
    payload: {
      error,
    },
  };
}

export function getBookDetails(bookId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(getBookDetailsRequest());
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/books/${bookId}`
      );
      const book = res.data;
      return dispatch(getBookDetailsSuccess(book));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getBookDetailsFailure(err));
      }
    }
  };
}

export function clearGetBookDetailsError(): BookDetailsActions {
  return {
    type: CLEAR_GET_BOOK_DETAILS_ERROR,
  };
}
