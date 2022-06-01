import { AxiosError } from 'axios';

// Action types
export const SIGN_IN = 'SIGN_IN';
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
  user: User | null;
  token: string;
};

export type SignInAction = {
  type: typeof SIGN_IN;
  payload: {
    user: User;
    token: string;
  };
};

export type SignOutAction = {
  type: typeof SIGN_OUT;
};

export type UserActions = SignInAction | SignOutAction;

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
