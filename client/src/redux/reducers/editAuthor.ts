import {
  EDIT_AUTHOR_REQUEST,
  EDIT_AUTHOR_SUCCESS,
  EDIT_AUTHOR_FAILURE,
  RESET_EDIT_AUTHOR,
  CLEAR_EDIT_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { EditAuthorActions, EditAuthorState } from '../../types';

export default function editAuthor(
  state: EditAuthorState = {
    loading: false,
    error: null,
    updated: false,
  },
  action: EditAuthorActions
): EditAuthorState {
  switch (action.type) {
    case EDIT_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
      };
    case EDIT_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_EDIT_AUTHOR:
      return {
        ...state,
        updated: false,
      };
    case CLEAR_EDIT_AUTHOR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
