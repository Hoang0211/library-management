import {
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  RESET_EDIT_BOOK,
  CLEAR_EDIT_BOOK_ERROR,
} from '../../constants/bookConstants';
import { EditBookActions, EditBookState } from '../../types';

export default function editBook(
  state: EditBookState = {
    loading: false,
    error: null,
    updated: false,
  },
  action: EditBookActions
): EditBookState {
  switch (action.type) {
    case EDIT_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
      };
    case EDIT_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_EDIT_BOOK:
      return {
        ...state,
        updated: false,
      };
    case CLEAR_EDIT_BOOK_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
