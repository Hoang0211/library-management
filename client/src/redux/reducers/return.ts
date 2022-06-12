import {
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_FAILURE,
  RESET_RETURN_BOOK,
  CLEAR_RETURN_BOOK_ERROR,
} from '../../constants/borrowConstants';
import { ReturnBookActions, ReturnBookState } from '../../types';

export default function returnBook(
  state: ReturnBookState = {
    loading: false,
    error: null,
    returned: false,
  },
  action: ReturnBookActions
): ReturnBookState {
  switch (action.type) {
    case RETURN_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RETURN_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        returned: true,
      };
    case RETURN_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_RETURN_BOOK:
      return {
        ...state,
        returned: false,
      };
    case CLEAR_RETURN_BOOK_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
