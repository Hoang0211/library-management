import { Dispatch } from 'redux';
import axios from 'axios';

import {
  BORROW_REQUEST,
  BORROW_SUCCESS,
  BORROW_FAILURE,
  RESET_BORROW,
  CLEAR_BORROW_ERROR,
} from '../../constants/borrowConstants';
import { Borrow, BorrowActions, isAxiosError } from '../../types';

export function borrowRequest(): BorrowActions {
  return {
    type: BORROW_REQUEST,
  };
}

export function borrowSuccess(): BorrowActions {
  return {
    type: BORROW_SUCCESS,
  };
}

export function borrowFailure(error: Error): BorrowActions {
  return {
    type: BORROW_FAILURE,
    payload: {
      error,
    },
  };
}

export function borrow(token: string, borrow: Borrow) {
  return async (dispatch: Dispatch) => {
    dispatch(borrowRequest());
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
      return dispatch(borrowSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(borrowFailure(err));
      }
    }
  };
}

export function resetBorrow(): BorrowActions {
  return {
    type: RESET_BORROW,
  };
}

export function clearBorrowError(): BorrowActions {
  return {
    type: CLEAR_BORROW_ERROR,
  };
}
