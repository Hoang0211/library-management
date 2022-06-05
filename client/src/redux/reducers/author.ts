import {
  GET_ALL_AUTHOR_REQUEST,
  GET_ALL_AUTHOR_SUCCESS,
  GET_ALL_AUTHOR_FAILURE,
  GET_AUTHOR_DETAILS_REQUEST,
  GET_AUTHOR_DETAILS_SUCCESS,
  GET_AUTHOR_DETAILS_FAILURE,
} from '../../constants/authorConstants';
import { AuthorActions, AuthorState } from '../../types';

export default function author(
  state: AuthorState = {
    loading: false,
    error: null,
    authors: [],
    author: null,
  },
  action: AuthorActions
): AuthorState {
  switch (action.type) {
    case GET_ALL_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        authors: action.payload.authors,
      };
    case GET_ALL_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case GET_AUTHOR_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        author: null,
      };
    case GET_AUTHOR_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        author: action.payload.author,
      };
    case GET_AUTHOR_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
