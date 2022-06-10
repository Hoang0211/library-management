import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_ALL_BORROWS_REQUEST,
  GET_ALL_BORROWS_SUCCESS,
  GET_ALL_BORROWS_FAILURE,
  CLEAR_GET_ALL_BORROWS_ERROR,
} from '../../constants/borrowConstants';
import { GetBorrowsActions, Borrow, isAxiosError } from '../../types';

export function getAllBorrowsRequest(): GetBorrowsActions {
  return {
    type: GET_ALL_BORROWS_REQUEST,
  };
}

export function getAllBorrowsSuccess(borrows: Borrow[]): GetBorrowsActions {
  return {
    type: GET_ALL_BORROWS_SUCCESS,
    payload: {
      borrows,
    },
  };
}

export function getAllBorrowsFailure(error: Error): GetBorrowsActions {
  return {
    type: GET_ALL_BORROWS_FAILURE,
    payload: {
      error,
    },
  };
}

export function getAllBorrows() {
  return async (dispatch: Dispatch) => {
    dispatch(getAllBorrowsRequest());
    try {
      const res = await axios.get('http://localhost:5000/api/v1/borrows');
      const borrows = res.data;
      return dispatch(getAllBorrowsSuccess(borrows));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getAllBorrowsFailure(err));
      }
    }
  };
}

export function clearGetAllBorrowsError(): GetBorrowsActions {
  return {
    type: CLEAR_GET_ALL_BORROWS_ERROR,
  };
}
