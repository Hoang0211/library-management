import {
  GET_ALL_AUTHOR_REQUEST,
  GET_ALL_AUTHOR_SUCCESS,
  GET_ALL_AUTHOR_FAILURE,
  CLEAR_GET_ALL_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { AuthorsActions, AuthorsState } from '../../types';

export default function authors(
  state: AuthorsState = {
    loading: false,
    error: null,
    authors: [],
  },
  action: AuthorsActions
): AuthorsState {
  switch (action.type) {
    case GET_ALL_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
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

    case CLEAR_GET_ALL_AUTHOR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
