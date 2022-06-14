import {
  GET_ALL_AUTHORS_REQUEST,
  GET_ALL_AUTHORS_SUCCESS,
  GET_ALL_AUTHORS_FAILURE,
  CLEAR_GET_ALL_AUTHORS_ERROR,
} from '../../constants/authorConstants';
import { GetAuthorsActions, GetAuthorsState } from '../../types';

export default function getAuthors(
  state: GetAuthorsState = {
    loading: false,
    error: null,
    authors: [],
  },
  action: GetAuthorsActions
): GetAuthorsState {
  switch (action.type) {
    case GET_ALL_AUTHORS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_AUTHORS_SUCCESS:
      return {
        ...state,
        loading: false,
        authors: action.payload.authors,
      };
    case GET_ALL_AUTHORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_GET_ALL_AUTHORS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
