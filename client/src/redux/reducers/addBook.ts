import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  RESET_ADD_BOOK,
  CLEAR_ADD_BOOK_ERROR,
} from '../../constants/bookConstants';
import { AddBookActions, AddBookState } from '../../types';

export default function addBook(
  state: AddBookState = {
    loading: false,
    error: null,
    added: false,
  },
  action: AddBookActions
): AddBookState {
  switch (action.type) {
    case ADD_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        added: true,
      };
    case ADD_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_ADD_BOOK:
      return {
        ...state,
        added: false,
      };
    case CLEAR_ADD_BOOK_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
