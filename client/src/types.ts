import { AxiosError } from 'axios';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from './constants/userConstants';
import {
  GET_ALL_AUTHOR_REQUEST,
  GET_ALL_AUTHOR_SUCCESS,
  GET_ALL_AUTHOR_FAILURE,
  GET_AUTHOR_DETAILS_REQUEST,
  GET_AUTHOR_DETAILS_SUCCESS,
  GET_AUTHOR_DETAILS_FAILURE,
} from './constants/authorConstants';

// Type guard
export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true;
}

// APP
export type AppState = {
  user: UserState;
  author: AuthorState;
};

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

// AUTHOR
export type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  biography: string;
  books: string[];
};

export type AuthorState = {
  loading: boolean;
  error: Error | null;
  authors: Author[];
  author: Author | null;
};

export type GetAllAuthorRequestAction = {
  type: typeof GET_ALL_AUTHOR_REQUEST;
};

export type GetAllAuthorSuccessAction = {
  type: typeof GET_ALL_AUTHOR_SUCCESS;
  payload: {
    authors: Author[];
  };
};

export type GetAllAuthorFailureAction = {
  type: typeof GET_ALL_AUTHOR_FAILURE;
  payload: {
    error: Error;
  };
};

export type GetAuthorDetailsRequestAction = {
  type: typeof GET_AUTHOR_DETAILS_REQUEST;
};

export type GetAuthorDetailsSuccessAction = {
  type: typeof GET_AUTHOR_DETAILS_SUCCESS;
  payload: {
    author: Author;
  };
};

export type GetAuthorDetailsFailureAction = {
  type: typeof GET_AUTHOR_DETAILS_FAILURE;
  payload: {
    error: Error;
  };
};

export type AuthorActions =
  | GetAllAuthorRequestAction
  | GetAllAuthorSuccessAction
  | GetAllAuthorFailureAction
  | GetAuthorDetailsRequestAction
  | GetAuthorDetailsSuccessAction
  | GetAuthorDetailsFailureAction;

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
