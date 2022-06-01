import { SIGN_IN, SIGN_OUT, UserActions, User } from '../../types';

export function signIn(user: User, token: string): UserActions {
  return {
    type: SIGN_IN,
    payload: {
      user,
      token,
    },
  };
}

export function signOut(): UserActions {
  return {
    type: SIGN_OUT,
  };
}
