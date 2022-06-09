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
  CLEAR_GET_ALL_AUTHOR_ERROR,
  GET_AUTHOR_DETAILS_REQUEST,
  GET_AUTHOR_DETAILS_SUCCESS,
  GET_AUTHOR_DETAILS_FAILURE,
  CLEAR_GET_AUTHOR_DETAILS_ERROR,
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  RESET_ADD_AUTHOR,
  CLEAR_ADD_AUTHOR_ERROR,
  EDIT_AUTHOR_REQUEST,
  EDIT_AUTHOR_SUCCESS,
  EDIT_AUTHOR_FAILURE,
  RESET_EDIT_AUTHOR,
  CLEAR_EDIT_AUTHOR_ERROR,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  RESET_DELETE_AUTHOR,
  CLEAR_DELETE_AUTHOR_ERROR,
} from './constants/authorConstants';
import {
  GET_ALL_BOOK_REQUEST,
  GET_ALL_BOOK_SUCCESS,
  GET_ALL_BOOK_FAILURE,
  CLEAR_GET_ALL_BOOK_ERROR,
  GET_BOOK_DETAILS_REQUEST,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_FAILURE,
  CLEAR_GET_BOOK_DETAILS_ERROR,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  RESET_ADD_BOOK,
  CLEAR_ADD_BOOK_ERROR,
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  RESET_EDIT_BOOK,
  CLEAR_EDIT_BOOK_ERROR,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  RESET_DELETE_BOOK,
  CLEAR_DELETE_BOOK_ERROR,
} from './constants/bookConstants';
import {
  GET_ALL_BORROW_REQUEST,
  GET_ALL_BORROW_SUCCESS,
  GET_ALL_BORROW_FAILURE,
  CLEAR_GET_ALL_BORROW_ERROR,
  LOAN_REQUEST,
  LOAN_SUCCESS,
  LOAN_FAILURE,
  RESET_LOAN,
  CLEAR_LOAN_ERROR,
  RETURN_REQUEST,
  RETURN_SUCCESS,
  RETURN_FAILURE,
  RESET_RETURN,
  CLEAR_RETURN_ERROR,
} from './constants/borrowConstants';

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
  editAuthor: EditAuthorState;
  deleteAuthor: DeleteAuthorState;

  books: BooksState;
  bookDetails: BookDetailsState;
  addBook: AddBookState;
  editBook: EditBookState;
  deleteBook: DeleteBookState;

  loan: LoanState;
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
  books: Book[];
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

export type ClearGetAllAuthorAction = {
  type: typeof CLEAR_GET_ALL_AUTHOR_ERROR;
};

export type AuthorsActions =
  | GetAllAuthorRequestAction
  | GetAllAuthorSuccessAction
  | GetAllAuthorFailureAction
  | ClearGetAllAuthorAction;

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

// EDIT AUTHOR
export type EditAuthorState = {
  loading: boolean;
  error: Error | null;
  updated: boolean;
};

export type EditAuthorRequestAction = {
  type: typeof EDIT_AUTHOR_REQUEST;
};

export type EditAuthorSuccessAction = {
  type: typeof EDIT_AUTHOR_SUCCESS;
};

export type EditAuthorFailureAction = {
  type: typeof EDIT_AUTHOR_FAILURE;
  payload: {
    error: Error;
  };
};

export type ResetEditAuthorAction = {
  type: typeof RESET_EDIT_AUTHOR;
};

export type ClearEditAuthorErrorAction = {
  type: typeof CLEAR_EDIT_AUTHOR_ERROR;
};

export type EditAuthorActions =
  | EditAuthorRequestAction
  | EditAuthorSuccessAction
  | EditAuthorFailureAction
  | ResetEditAuthorAction
  | ClearEditAuthorErrorAction;

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

// BOOKS
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
  authors: Author[];
  publisher: string;
  publishedDate: string;
  category: Category;
  numPage: number;
  status: Status;
};

export type BooksState = {
  loading: boolean;
  error: Error | null;
  books: Book[];
};

export type GetAllBookRequestAction = {
  type: typeof GET_ALL_BOOK_REQUEST;
};

export type GetAllBookSuccessAction = {
  type: typeof GET_ALL_BOOK_SUCCESS;
  payload: {
    books: Book[];
  };
};

export type GetAllBookFailureAction = {
  type: typeof GET_ALL_BOOK_FAILURE;
  payload: {
    error: Error;
  };
};

export type ClearGetAllBookAction = {
  type: typeof CLEAR_GET_ALL_BOOK_ERROR;
};

export type BooksActions =
  | GetAllBookRequestAction
  | GetAllBookSuccessAction
  | GetAllBookFailureAction
  | ClearGetAllBookAction;

// BOOK DETAILS
export type BookDetailsState = {
  loading: boolean;
  error: Error | null;
  book: Book | null;
};

export type GetBookDetailsRequestAction = {
  type: typeof GET_BOOK_DETAILS_REQUEST;
};

export type GetBookDetailsSuccessAction = {
  type: typeof GET_BOOK_DETAILS_SUCCESS;
  payload: {
    book: Book;
  };
};

export type GetBookDetailsFailureAction = {
  type: typeof GET_BOOK_DETAILS_FAILURE;
  payload: {
    error: Error;
  };
};

export type ClearGetBookDetailsAction = {
  type: typeof CLEAR_GET_BOOK_DETAILS_ERROR;
};

export type BookDetailsActions =
  | GetBookDetailsRequestAction
  | GetBookDetailsSuccessAction
  | GetBookDetailsFailureAction
  | ClearGetBookDetailsAction;

// NEW BOOK
export type AddBookState = {
  loading: boolean;
  error: Error | null;
  added: boolean;
};

export type AddBookRequestAction = {
  type: typeof ADD_BOOK_REQUEST;
};

export type AddBookSuccessAction = {
  type: typeof ADD_BOOK_SUCCESS;
};

export type AddBookFailureAction = {
  type: typeof ADD_BOOK_FAILURE;
  payload: {
    error: Error;
  };
};

export type ResetAddBookAction = {
  type: typeof RESET_ADD_BOOK;
};

export type ClearAddBookErrorAction = {
  type: typeof CLEAR_ADD_BOOK_ERROR;
};

export type AddBookActions =
  | AddBookRequestAction
  | AddBookSuccessAction
  | AddBookFailureAction
  | ResetAddBookAction
  | ClearAddBookErrorAction;

// EDIT BOOK
export type EditBookState = {
  loading: boolean;
  error: Error | null;
  updated: boolean;
};

export type EditBookRequestAction = {
  type: typeof EDIT_BOOK_REQUEST;
};

export type EditBookSuccessAction = {
  type: typeof EDIT_BOOK_SUCCESS;
};

export type EditBookFailureAction = {
  type: typeof EDIT_BOOK_FAILURE;
  payload: {
    error: Error;
  };
};

export type ResetEditBookAction = {
  type: typeof RESET_EDIT_BOOK;
};

export type ClearEditBookErrorAction = {
  type: typeof CLEAR_EDIT_BOOK_ERROR;
};

export type EditBookActions =
  | EditBookRequestAction
  | EditBookSuccessAction
  | EditBookFailureAction
  | ResetEditBookAction
  | ClearEditBookErrorAction;

// DELETE BOOK
export type DeleteBookState = {
  loading: boolean;
  error: Error | null;
  deleted: boolean;
};

export type DeleteBookRequestAction = {
  type: typeof DELETE_BOOK_REQUEST;
};

export type DeleteBookSuccessAction = {
  type: typeof DELETE_BOOK_SUCCESS;
};

export type DeleteBookFailureAction = {
  type: typeof DELETE_BOOK_FAILURE;
  payload: {
    error: Error;
  };
};

export type ResetDeleteBookAction = {
  type: typeof RESET_DELETE_BOOK;
};

export type ClearDeleteBookErrorAction = {
  type: typeof CLEAR_DELETE_BOOK_ERROR;
};

export type DeleteBookActions =
  | DeleteBookRequestAction
  | DeleteBookSuccessAction
  | DeleteBookFailureAction
  | ResetDeleteBookAction
  | ClearDeleteBookErrorAction;

export type Borrow = {
  _id: string;
  userId: string;
  bookIds: string[];
};

// LOAN
export type LoanState = {
  loading: boolean;
  error: Error | null;
  loaned: boolean;
};

export type LoanRequestAction = {
  type: typeof LOAN_REQUEST;
};

export type LoanSuccessAction = {
  type: typeof LOAN_SUCCESS;
};

export type LoanFailureAction = {
  type: typeof LOAN_FAILURE;
  payload: {
    error: Error;
  };
};

export type ResetLoanAction = {
  type: typeof RESET_LOAN;
};

export type ClearLoanErrorAction = {
  type: typeof CLEAR_LOAN_ERROR;
};

export type LoanActions =
  | LoanRequestAction
  | LoanSuccessAction
  | LoanFailureAction
  | ResetLoanAction
  | ClearLoanErrorAction;
