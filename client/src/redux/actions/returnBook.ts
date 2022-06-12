import { Dispatch } from 'redux';
import axios from 'axios';

import {
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_FAILURE,
  RESET_RETURN_BOOK,
  CLEAR_RETURN_BOOK_ERROR,
} from '../../constants/borrowConstants';
import { ReturnBookActions, isAxiosError } from '../../types';

export function ReturnBookRequest(): ReturnBookActions {
  return {
    type: RETURN_BOOK_REQUEST,
  };
}

export function ReturnBookSuccess(): ReturnBookActions {
  return {
    type: RETURN_BOOK_SUCCESS,
  };
}

export function ReturnBookFailure(error: Error): ReturnBookActions {
  return {
    type: RETURN_BOOK_FAILURE,
    payload: {
      error,
    },
  };
}

export function returnBook(token: string, borrowId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(ReturnBookRequest());
    try {
      await axios.delete(`http://localhost:5000/api/v1/borrows/${borrowId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return dispatch(ReturnBookSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(ReturnBookFailure(err));
      }
    }
  };
}

export function resetReturnBook(): ReturnBookActions {
  return {
    type: RESET_RETURN_BOOK,
  };
}

export function clearReturnBookError(): ReturnBookActions {
  return {
    type: CLEAR_RETURN_BOOK_ERROR,
  };
}
