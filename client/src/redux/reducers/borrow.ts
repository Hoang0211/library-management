import {
  BORROW_REQUEST,
  BORROW_SUCCESS,
  BORROW_FAILURE,
  RESET_BORROW,
  CLEAR_BORROW_ERROR,
} from '../../constants/borrowConstants';
import { BorrowActions, BorrowState } from '../../types';

export default function borrow(
  state: BorrowState = {
    loading: false,
    error: null,
    borrowed: false,
  },
  action: BorrowActions
): BorrowState {
  switch (action.type) {
    case BORROW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BORROW_SUCCESS:
      return {
        ...state,
        loading: false,
        borrowed: true,
      };
    case BORROW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_BORROW:
      return {
        ...state,
        borrowed: false,
      };
    case CLEAR_BORROW_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
