import {
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  CLEAR_GET_ALL_BOOKS_ERROR,
} from '../../constants/bookConstants';
import { GetBooksActions, GetBooksState } from '../../types';

export default function getBooks(
  state: GetBooksState = {
    loading: false,
    error: null,
    books: [],
  },
  action: GetBooksActions
): GetBooksState {
  switch (action.type) {
    case GET_ALL_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books,
      };
    case GET_ALL_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_GET_ALL_BOOKS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
