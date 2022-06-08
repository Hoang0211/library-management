import { Dispatch } from 'redux';
import axios from 'axios';

import {
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  RESET_DELETE_BOOK,
  CLEAR_DELETE_BOOK_ERROR,
} from '../../constants/bookConstants';
import { DeleteBookActions, isAxiosError } from '../../types';

export function deleteBookRequest(): DeleteBookActions {
  return {
    type: DELETE_BOOK_REQUEST,
  };
}

export function deleteBookSuccess(): DeleteBookActions {
  return {
    type: DELETE_BOOK_SUCCESS,
  };
}

export function deleteBookFailure(error: Error): DeleteBookActions {
  return {
    type: DELETE_BOOK_FAILURE,
    payload: {
      error,
    },
  };
}

export function deleteBook(token: string, bookId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(deleteBookRequest());
    try {
      await axios.delete(`http://localhost:5000/api/v1/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch(deleteBookSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(deleteBookFailure(err));
      }
    }
  };
}

export function resetDeleteBook(): DeleteBookActions {
  return {
    type: RESET_DELETE_BOOK,
  };
}

export function clearDeleteBookError(): DeleteBookActions {
  return {
    type: CLEAR_DELETE_BOOK_ERROR,
  };
}
