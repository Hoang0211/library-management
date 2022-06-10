import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_ALL_LOAN_REQUEST,
  GET_ALL_LOAN_SUCCESS,
  GET_ALL_LOAN_FAILURE,
  CLEAR_GET_ALL_LOAN_ERROR,
} from '../../constants/borrowConstants';
import { LoansActions, Loan, isAxiosError } from '../../types';

export function getAllLoanRequest(): LoansActions {
  return {
    type: GET_ALL_LOAN_REQUEST,
  };
}

export function getAllLoanSuccess(loans: Loan[]): LoansActions {
  return {
    type: GET_ALL_LOAN_SUCCESS,
    payload: {
      loans,
    },
  };
}

export function getAllLoanFailure(error: Error): LoansActions {
  return {
    type: GET_ALL_LOAN_FAILURE,
    payload: {
      error,
    },
  };
}

export function getAllLoan() {
  return async (dispatch: Dispatch) => {
    dispatch(getAllLoanRequest());
    try {
      const res = await axios.get('http://localhost:5000/api/v1/borrows');
      const loans = res.data;
      return dispatch(getAllLoanSuccess(loans));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getAllLoanFailure(err));
      }
    }
  };
}

export function clearGetAllLoanError(): LoansActions {
  return {
    type: CLEAR_GET_ALL_LOAN_ERROR,
  };
}
