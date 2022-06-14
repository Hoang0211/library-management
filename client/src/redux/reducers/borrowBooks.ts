import {
  BORROW_BOOKS_REQUEST,
  BORROW_BOOKS_SUCCESS,
  BORROW_BOOKS_FAILURE,
  RESET_BORROW_BOOKS,
  CLEAR_BORROW_BOOKS_ERROR,
} from '../../constants/borrowConstants';
import { BorrowBooksActions, BorrowBooksState } from '../../types';

export default function borrowBooks(
  state: BorrowBooksState = {
    loading: false,
    error: null,
    borrowed: false,
  },
  action: BorrowBooksActions
): BorrowBooksState {
  switch (action.type) {
    case BORROW_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BORROW_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        borrowed: true,
      };
    case BORROW_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_BORROW_BOOKS:
      return {
        ...state,
        borrowed: false,
      };
    case CLEAR_BORROW_BOOKS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
