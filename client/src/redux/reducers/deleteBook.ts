import {
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  RESET_DELETE_BOOK,
  CLEAR_DELETE_BOOK_ERROR,
} from '../../constants/bookConstants';
import { DeleteBookActions, DeleteBookState } from '../../types';

export default function deleteBook(
  state: DeleteBookState = {
    loading: false,
    error: null,
    deleted: false,
  },
  action: DeleteBookActions
): DeleteBookState {
  switch (action.type) {
    case DELETE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
      };
    case DELETE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_DELETE_BOOK:
      return {
        ...state,
        deleted: false,
      };
    case CLEAR_DELETE_BOOK_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
