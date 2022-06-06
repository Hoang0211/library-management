import {
  GET_AUTHOR_DETAILS_REQUEST,
  GET_AUTHOR_DETAILS_SUCCESS,
  GET_AUTHOR_DETAILS_FAILURE,
  CLEAR_GET_AUTHOR_DETAILS_ERROR,
} from '../../constants/authorConstants';
import { AuthorDetailsActions, AuthorDetailsState } from '../../types';

export default function authorDetails(
  state: AuthorDetailsState = {
    loading: false,
    error: null,
    author: null,
  },
  action: AuthorDetailsActions
): AuthorDetailsState {
  switch (action.type) {
    case GET_AUTHOR_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
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
    case CLEAR_GET_AUTHOR_DETAILS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
