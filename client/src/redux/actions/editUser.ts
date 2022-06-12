import { Dispatch } from 'redux';
import axios from 'axios';

import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  RESET_EDIT_USER,
  CLEAR_EDIT_USER_ERROR,
} from '../../constants/userConstants';
import { EditUserActions, User, isAxiosError } from '../../types';

export function editUserRequest(): EditUserActions {
  return {
    type: EDIT_USER_REQUEST,
  };
}

export function editUserSuccess(): EditUserActions {
  return {
    type: EDIT_USER_SUCCESS,
  };
}

export function editUserFailure(error: Error): EditUserActions {
  return {
    type: EDIT_USER_FAILURE,
    payload: {
      error,
    },
  };
}

export function editUser(token: string, userId: string, user: Partial<User>) {
  return async (dispatch: Dispatch) => {
    dispatch(editUserRequest());
    try {
      await axios.put(
        `http://localhost:5000/api/v1/users/${userId}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch(editUserSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(editUserFailure(err));
      }
    }
  };
}

export function resetEditUser(): EditUserActions {
  return {
    type: RESET_EDIT_USER,
  };
}

export function clearEditUserError(): EditUserActions {
  return {
    type: CLEAR_EDIT_USER_ERROR,
  };
}
