import { Dispatch } from 'redux';
import axios from 'axios';

import {
  LOAN_REQUEST,
  LOAN_SUCCESS,
  LOAN_FAILURE,
  RESET_LOAN,
  CLEAR_LOAN_ERROR,
} from '../../constants/borrowConstants';
import { Loan, LoanActions, isAxiosError } from '../../types';

export function loanRequest(): LoanActions {
  return {
    type: LOAN_REQUEST,
  };
}

export function loanSuccess(): LoanActions {
  return {
    type: LOAN_SUCCESS,
  };
}

export function loanFailure(error: Error): LoanActions {
  return {
    type: LOAN_FAILURE,
    payload: {
      error,
    },
  };
}

export function loan(token: string, loan: Loan) {
  return async (dispatch: Dispatch) => {
    dispatch(loanRequest());
    try {
      await axios.post(
        `http://localhost:5000/api/v1/borrows/`,
        {
          userEmail: loan.userEmail,
          bookIds: loan.bookIds,
          loanDate: loan.loanDate,
          dueDate: loan.dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch(loanSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(loanFailure(err));
      }
    }
  };
}

export function resetLoan(): LoanActions {
  return {
    type: RESET_LOAN,
  };
}

export function clearLoanError(): LoanActions {
  return {
    type: CLEAR_LOAN_ERROR,
  };
}
