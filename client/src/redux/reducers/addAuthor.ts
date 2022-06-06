import {
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  RESET_ADD_AUTHOR,
  CLEAR_ADD_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { AddAuthorActions, AddAuthorState } from '../../types';

export default function addAuthor(
  state: AddAuthorState = {
    loading: false,
    error: null,
    added: false,
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
        added: true,
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
        added: false,
      };
    case CLEAR_ADD_AUTHOR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
