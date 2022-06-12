import { Dispatch } from 'redux';
import axios from 'axios';

import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  UPDATE_STORED_USER,
} from '../../constants/userConstants';
import { UserActions, User, isAxiosError } from '../../types';

export function signInRequest(googleTokenId: string): UserActions {
  return {
    type: SIGN_IN_REQUEST,
    payload: {
      googleTokenId,
    },
  };
}

export function signInSuccess(user: User, token: string): UserActions {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      user,
      token,
    },
  };
}

export function signInFailure(error: Error): UserActions {
  return {
    type: SIGN_IN_FAILURE,
    payload: {
      error,
    },
  };
}

export function signIn(googleTokenId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(signInRequest(googleTokenId));
    try {
      const res = await axios.post(
        'http://localhost:5000/google-login',
        {},
        {
          headers: {
            Authorization: `Bearer ${googleTokenId}`,
          },
        }
      );
      const token = res.data.token;
      const user = res.data.user;

      return dispatch(signInSuccess(user, token));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(signInFailure(err));
      }
    }
  };
}

export function signOut(): UserActions {
  return {
    type: SIGN_OUT,
  };
}

export function updateStoredUser(user: User): UserActions {
  return {
    type: UPDATE_STORED_USER,
    payload: {
      user,
    },
  };
}
