import { AxiosError } from 'axios';

// Action types
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_OUT = 'SIGN_OUT';

export type AppState = {
  user: UserState;
};

// Guard
export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true;
}

// USER
export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
};

export type UserState = {
  loading: boolean;
  error: Error | null;
  user: User | null;
  token: string;
};

export type SignInRequestAction = {
  type: typeof SIGN_IN_REQUEST;
  payload: {
    googleTokenId: string;
  };
};

export type SignInSuccessAction = {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    user: User;
    token: string;
  };
};

export type SignInFailureAction = {
  type: typeof SIGN_IN_FAILURE;
  payload: {
    error: Error;
  };
};

export type SignOutAction = {
  type: typeof SIGN_OUT;
};

export type UserActions =
  | SignInRequestAction
  | SignInSuccessAction
  | SignInFailureAction
  | SignOutAction;

// BOOK
export enum Category {
  Journal = 'journal',
  Article = 'article',
  Book = 'book',
  Thesis = 'thesis',
  Other = 'other',
}

export enum Status {
  Available = 'available',
  Borrowed = 'borrowed',
}

export type Book = {
  _id: string;
  isbn: string;
  title: string;
  description: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  category: string;
  numPage: number;
  status: Status;
};

export type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  biography: string;
  books: string[];
};
