import { Dispatch } from 'redux';
import axios from 'axios';

import {
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  RESET_EDIT_BOOK,
  CLEAR_EDIT_BOOK_ERROR,
} from '../../constants/bookConstants';
import { EditBookActions, Book, isAxiosError } from '../../types';

export function editBookRequest(): EditBookActions {
  return {
    type: EDIT_BOOK_REQUEST,
  };
}

export function editBookSuccess(): EditBookActions {
  return {
    type: EDIT_BOOK_SUCCESS,
  };
}

export function editBookFailure(error: Error): EditBookActions {
  return {
    type: EDIT_BOOK_FAILURE,
    payload: {
      error,
    },
  };
}

export function editBook(token: string, bookId: string, book: Partial<Book>) {
  return async (dispatch: Dispatch) => {
    dispatch(editBookRequest());
    try {
      await axios.put(
        `http://localhost:5000/api/v1/books/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch(editBookSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(editBookFailure(err));
      }
    }
  };
}

export function resetEditBook(): EditBookActions {
  return {
    type: RESET_EDIT_BOOK,
  };
}

export function clearEditBookError(): EditBookActions {
  return {
    type: CLEAR_EDIT_BOOK_ERROR,
  };
}
