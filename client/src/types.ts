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
  CLEAR_GET_AUTHOR_DETAILS_ERROR,
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  RESET_ADD_AUTHOR,
  CLEAR_ADD_AUTHOR_ERROR,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  RESET_DELETE_AUTHOR,
  CLEAR_DELETE_AUTHOR_ERROR,
} from './constants/authorConstants';

// Type guard
export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true;
}

// APP
export type AppState = {
  user: UserState;
  authors: AuthorsState;
  authorDetails: AuthorDetailsState;
  addAuthor: AddAuthorState;
  deleteAuthor: DeleteAuthorState;
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

// AUTHORS
export type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  biography: string;
  books: string[];
};

export type AuthorsState = {
  loading: boolean;
  error: Error | null;
  authors: Author[];
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

export type AuthorsActions =
  | GetAllAuthorRequestAction
  | GetAllAuthorSuccessAction
  | GetAllAuthorFailureAction;

// AUTHOR DETAILS
export type AuthorDetailsState = {
  loading: boolean;
  error: Error | null;
  author: Author | null;
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

export type ClearGetAuthorDetailsAction = {
  type: typeof CLEAR_GET_AUTHOR_DETAILS_ERROR;
};

export type AuthorDetailsActions =
  | GetAuthorDetailsRequestAction
  | GetAuthorDetailsSuccessAction
  | GetAuthorDetailsFailureAction
  | ClearGetAuthorDetailsAction;

// NEW AUTHOR
export type AddAuthorState = {
  loading: boolean;
  error: Error | null;
  added: boolean;
};

export type AddAuthorRequestAction = {
  type: typeof ADD_AUTHOR_REQUEST;
};

export type AddAuthorSuccessAction = {
  type: typeof ADD_AUTHOR_SUCCESS;
  payload: {
    author: Author;
  };
};

export type AddAuthorFailureAction = {
  type: typeof ADD_AUTHOR_FAILURE;
  payload: {
    error: Error;
  };
};

export type ResetAddAuthorAction = {
  type: typeof RESET_ADD_AUTHOR;
};

export type ClearAddAuthorErrorAction = {
  type: typeof CLEAR_ADD_AUTHOR_ERROR;
};

export type AddAuthorActions =
  | AddAuthorRequestAction
  | AddAuthorSuccessAction
  | AddAuthorFailureAction
  | ResetAddAuthorAction
  | ClearAddAuthorErrorAction;

// DELETE AUTHOR
export type DeleteAuthorState = {
  loading: boolean;
  error: Error | null;
  deleted: boolean;
};

export type DeleteAuthorRequestAction = {
  type: typeof DELETE_AUTHOR_REQUEST;
};

export type DeleteAuthorSuccessAction = {
  type: typeof DELETE_AUTHOR_SUCCESS;
  payload: {
    author: Author;
  };
};

export type DeleteAuthorFailureAction = {
  type: typeof DELETE_AUTHOR_FAILURE;
  payload: {
    error: Error;
  };
};

export type ResetDeleteAuthorAction = {
  type: typeof RESET_DELETE_AUTHOR;
};

export type ClearDeleteAuthorErrorAction = {
  type: typeof CLEAR_DELETE_AUTHOR_ERROR;
};

export type DeleteAuthorActions =
  | DeleteAuthorRequestAction
  | DeleteAuthorSuccessAction
  | DeleteAuthorFailureAction
  | ResetDeleteAuthorAction
  | ClearDeleteAuthorErrorAction;

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
