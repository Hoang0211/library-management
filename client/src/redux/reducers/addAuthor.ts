import {
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  RESET_ADD_AUTHOR,
  CLEAR_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { AddAuthorActions, AddAuthorState } from '../../types';

export default function addAuthor(
  state: AddAuthorState = {
    loading: false,
    error: null,
    author: null,
  },
  action: AddAuthorActions
): AddAuthorState {
  switch (action.type) {
    case ADD_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        author: action.payload.author,
      };
    case ADD_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_ADD_AUTHOR:
      return {
        ...state,
        author: null,
      };
    case CLEAR_AUTHOR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
