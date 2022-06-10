import {
  GET_ALL_LOAN_REQUEST,
  GET_ALL_LOAN_SUCCESS,
  GET_ALL_LOAN_FAILURE,
  CLEAR_GET_ALL_LOAN_ERROR,
} from '../../constants/borrowConstants';
import { LoansActions, LoansState } from '../../types';

export default function loans(
  state: LoansState = {
    loading: false,
    error: null,
    loans: [],
  },
  action: LoansActions
): LoansState {
  switch (action.type) {
    case GET_ALL_LOAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        loans: action.payload.loans,
      };
    case GET_ALL_LOAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_GET_ALL_LOAN_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
