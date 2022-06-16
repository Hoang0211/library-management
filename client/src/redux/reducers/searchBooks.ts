import {
  SEARCH_ALL_BOOKS_REQUEST,
  SEARCH_ALL_BOOKS_SUCCESS,
  SEARCH_ALL_BOOKS_FAILURE,
  CLEAR_SEARCH_ALL_BOOKS_ERROR,
} from '../../constants/bookConstants';
import { SearchAllBooksActions, SearchBooksState } from '../../types';

export default function searchBooks(
  state: SearchBooksState = {
    loading: false,
    error: null,
    books: [],
    count: 0,
  },
  action: SearchAllBooksActions
): SearchBooksState {
  switch (action.type) {
    case SEARCH_ALL_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ALL_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload.books,
        count: action.payload.count,
      };
    case SEARCH_ALL_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_SEARCH_ALL_BOOKS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
