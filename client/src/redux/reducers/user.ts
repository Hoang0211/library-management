import { getUserFromLocal, getTokenFromLocal } from '../store';
import { SIGN_IN, SIGN_OUT, UserActions, UserState } from '../../types';

export default function user(
  state: UserState = {
    user: getUserFromLocal(),
    token: getTokenFromLocal(),
  },
  action: UserActions
): UserState {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case SIGN_OUT:
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        user: null,
        token: '',
      };
    default:
      return state;
  }
}
