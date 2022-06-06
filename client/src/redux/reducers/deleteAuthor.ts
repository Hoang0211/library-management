import {
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  RESET_DELETE_AUTHOR,
  CLEAR_DELETE_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { DeleteAuthorActions, DeleteAuthorState } from '../../types';

export default function deleteAuthor(
  state: DeleteAuthorState = {
    loading: false,
    error: null,
    deleted: false,
  },
  action: DeleteAuthorActions
): DeleteAuthorState {
  switch (action.type) {
    case DELETE_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
      };
    case DELETE_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_DELETE_AUTHOR:
      return {
        ...state,
        deleted: false,
      };
    case CLEAR_DELETE_AUTHOR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
