import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  RESET_EDIT_USER,
  CLEAR_EDIT_USER_ERROR,
} from '../../constants/userConstants';
import { EditUserActions, EditUserState } from '../../types';

export default function editUser(
  state: EditUserState = {
    loading: false,
    error: null,
    updated: false,
    updatedUser: null,
  },
  action: EditUserActions
): EditUserState {
  switch (action.type) {
    case EDIT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        updatedUser: action.payload.updatedUser,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_EDIT_USER:
      return {
        ...state,
        updated: false,
        updatedUser: null,
      };
    case CLEAR_EDIT_USER_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
