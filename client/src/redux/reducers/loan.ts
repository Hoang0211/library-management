import {
  LOAN_REQUEST,
  LOAN_SUCCESS,
  LOAN_FAILURE,
  RESET_LOAN,
  CLEAR_LOAN_ERROR,
} from '../../constants/borrowConstants';
import { LoanActions, LoanState } from '../../types';

export default function addAuthor(
  state: LoanState = {
    loading: false,
    error: null,
    loaned: false,
  },
  action: LoanActions
): LoanState {
  switch (action.type) {
    case LOAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaned: true,
      };
    case LOAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_LOAN:
      return {
        ...state,
        loaned: false,
      };
    case CLEAR_LOAN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
