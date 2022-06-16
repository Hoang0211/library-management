import {
  SEARCH_ALL_AUTHORS_REQUEST,
  SEARCH_ALL_AUTHORS_SUCCESS,
  SEARCH_ALL_AUTHORS_FAILURE,
  CLEAR_SEARCH_ALL_AUTHORS_ERROR,
} from '../../constants/authorConstants';
import { SearchAllAuthorsActions, SearchAuthorsState } from '../../types';

export default function searchAuthors(
  state: SearchAuthorsState = {
    loading: false,
    error: null,
    authors: [],
    count: 0,
  },
  action: SearchAllAuthorsActions
): SearchAuthorsState {
  switch (action.type) {
    case SEARCH_ALL_AUTHORS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ALL_AUTHORS_SUCCESS:
      return {
        ...state,
        loading: false,
        authors: action.payload.authors,
        count: action.payload.count,
      };
    case SEARCH_ALL_AUTHORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_SEARCH_ALL_AUTHORS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
