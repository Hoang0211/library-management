import {
  GET_ALL_AUTHOR_REQUEST,
  GET_ALL_AUTHOR_SUCCESS,
  GET_ALL_AUTHOR_FAILURE,
} from '../../constants/authorConstants';
import { AuthorActions, AuthorState } from '../../types';

export default function author(
  state: AuthorState = {
    loading: false,
    error: null,
    authors: [],
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
    default:
      return state;
  }
}
