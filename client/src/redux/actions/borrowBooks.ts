import { Dispatch } from 'redux';
import axios from 'axios';

import {
  BORROW_BOOKS_REQUEST,
  BORROW_BOOKS_SUCCESS,
  BORROW_BOOKS_FAILURE,
  RESET_BORROW_BOOKS,
  CLEAR_BORROW_BOOKS_ERROR,
} from '../../constants/borrowConstants';
import {
  BorrowBooksRequest,
  BorrowBooksActions,
  isAxiosError,
} from '../../types';

export function borrowBooksRequest(): BorrowBooksActions {
  return {
    type: BORROW_BOOKS_REQUEST,
  };
}

export function borrowBooksSuccess(): BorrowBooksActions {
  return {
    type: BORROW_BOOKS_SUCCESS,
  };
}

export function borrowBooksFailure(error: Error): BorrowBooksActions {
  return {
    type: BORROW_BOOKS_FAILURE,
    payload: {
      error,
    },
  };
}

export function borrowBooks(token: string, borrow: BorrowBooksRequest) {
  return async (dispatch: Dispatch) => {
    dispatch(borrowBooksRequest());
    try {
      await axios.post(
        `http://localhost:5000/api/v1/borrows/`,
        {
          userEmail: borrow.userEmail,
          bookIds: borrow.bookIds,
          borrowDate: borrow.borrowDate,
          dueDate: borrow.dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch(borrowBooksSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(borrowBooksFailure(err));
      }
    }
  };
}

export function resetBorrowBooks(): BorrowBooksActions {
  return {
    type: RESET_BORROW_BOOKS,
  };
}

export function clearBorrowBooksError(): BorrowBooksActions {
  return {
    type: CLEAR_BORROW_BOOKS_ERROR,
  };
}
