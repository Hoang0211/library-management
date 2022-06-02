import { getUserFromLocal, getTokenFromLocal } from '../store';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  UserActions,
  UserState,
} from '../../types';

export default function user(
  state: UserState = {
    loading: false,
    error: null,
    user: getUserFromLocal(),
    token: getTokenFromLocal(),
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGN_IN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case SIGN_OUT:
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: '',
      };
    default:
      return state;
  }
}
