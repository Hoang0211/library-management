import {
  GET_ALL_BOOK_REQUEST,
  GET_ALL_BOOK_SUCCESS,
  GET_ALL_BOOK_FAILURE,
  CLEAR_GET_ALL_BOOK_ERROR,
} from '../../constants/bookConstants';
import { BooksActions, BooksState } from '../../types';

export default function books(
  state: BooksState = {
    loading: false,
    error: null,
    books: [],
  },
  action: BooksActions
): BooksState {
  switch (action.type) {
    case GET_ALL_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books,
      };
    case GET_ALL_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_GET_ALL_BOOK_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
