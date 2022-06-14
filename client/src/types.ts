import { AxiosError } from 'axios';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  UPDATE_STORED_USER,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  RESET_EDIT_USER,
  CLEAR_EDIT_USER_ERROR,
} from './constants/userConstants';
import {
  GET_ALL_AUTHORS_REQUEST,
  GET_ALL_AUTHORS_SUCCESS,
  GET_ALL_AUTHORS_FAILURE,
  CLEAR_GET_ALL_AUTHORS_ERROR,
  SEARCH_ALL_AUTHORS_REQUEST,
  SEARCH_ALL_AUTHORS_SUCCESS,
  SEARCH_ALL_AUTHORS_FAILURE,
  CLEAR_SEARCH_ALL_AUTHORS_ERROR,
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
  GET_ALL_BOOKS_REQUEST,
  GET_ALL_BOOKS_SUCCESS,
  GET_ALL_BOOKS_FAILURE,
  CLEAR_GET_ALL_BOOKS_ERROR,
  SEARCH_ALL_BOOKS_REQUEST,
  SEARCH_ALL_BOOKS_SUCCESS,
  SEARCH_ALL_BOOKS_FAILURE,
  CLEAR_SEARCH_ALL_BOOKS_ERROR,
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
  GET_ALL_BORROWS_REQUEST,
  GET_ALL_BORROWS_SUCCESS,
  GET_ALL_BORROWS_FAILURE,
  CLEAR_GET_ALL_BORROWS_ERROR,
  BORROW_REQUEST,
  BORROW_SUCCESS,
  BORROW_FAILURE,
  RESET_BORROW,
  CLEAR_BORROW_ERROR,
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_FAILURE,
  RESET_RETURN_BOOK,
  CLEAR_RETURN_BOOK_ERROR,
} from './constants/borrowConstants';

// Type guard
export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true;
}

// APP
export type AppState = {
  user: UserState;
  editUser: EditUserState;

  getBooks: GetBooksState;
  searchBooks: SearchBooksState;
  getBookDetails: GetBookDetailsState;
  addBook: AddBookState;
  editBook: EditBookState;
  deleteBook: DeleteBookState;

  getAuthors: GetAuthorsState;
  searchAuthors: SearchAuthorsState;
  getAuthorDetails: GetAuthorDetailsState;
  addAuthor: AddAuthorState;
  editAuthor: EditAuthorState;
  deleteAuthor: DeleteAuthorState;

  getBorrows: GetBorrowsState;
  borrow: BorrowState;
  returnBook: ReturnBookState;
};

// USER
export enum Role {
  User = 'user',
  Admin = 'admin',
}
export type User = {
  _id: string;
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
export type UpdateStoredUserAction = {
  type: typeof UPDATE_STORED_USER;
  payload: {
    user: User;
  };
};
export type UserActions =
  | SignInRequestAction
  | SignInSuccessAction
  | SignInFailureAction
  | SignOutAction
  | UpdateStoredUserAction;

// EDIT USER
export type EditUserState = {
  loading: boolean;
  error: Error | null;
  updated: boolean;
  updatedUser: User | null;
};
export type EditUserRequestAction = {
  type: typeof EDIT_USER_REQUEST;
};
export type EditUserSuccessAction = {
  type: typeof EDIT_USER_SUCCESS;
  payload: {
    updatedUser: User;
  };
};
export type EditUserFailureAction = {
  type: typeof EDIT_USER_FAILURE;
  payload: {
    error: Error;
  };
};
export type ResetEditUserAction = {
  type: typeof RESET_EDIT_USER;
};
export type ClearEditUserErrorAction = {
  type: typeof CLEAR_EDIT_USER_ERROR;
};
export type EditUserActions =
  | EditUserRequestAction
  | EditUserSuccessAction
  | EditUserFailureAction
  | ResetEditUserAction
  | ClearEditUserErrorAction;

// GET BOOKS
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
export type GetBooksState = {
  loading: boolean;
  error: Error | null;
  books: Book[];
};
export type GetAllBooksRequestAction = {
  type: typeof GET_ALL_BOOKS_REQUEST;
};
export type GetAllBooksSuccessAction = {
  type: typeof GET_ALL_BOOKS_SUCCESS;
  payload: {
    books: Book[];
  };
};
export type GetAllBooksFailureAction = {
  type: typeof GET_ALL_BOOKS_FAILURE;
  payload: {
    error: Error;
  };
};
export type ClearGetAllBooksAction = {
  type: typeof CLEAR_GET_ALL_BOOKS_ERROR;
};
export type GetBooksActions =
  | GetAllBooksRequestAction
  | GetAllBooksSuccessAction
  | GetAllBooksFailureAction
  | ClearGetAllBooksAction;

// SEARCH BOOKS
export type SearchBooksState = {
  loading: boolean;
  error: Error | null;
  books: Book[];
  count: number;
};
export type SearchAllBooksRequestAction = {
  type: typeof SEARCH_ALL_BOOKS_REQUEST;
};
export type SearchAllBooksSuccessAction = {
  type: typeof SEARCH_ALL_BOOKS_SUCCESS;
  payload: {
    books: Book[];
    count: number;
  };
};
export type SearchAllBooksFailureAction = {
  type: typeof SEARCH_ALL_BOOKS_FAILURE;
  payload: {
    error: Error;
  };
};
export type ClearSearchAllBooksAction = {
  type: typeof CLEAR_SEARCH_ALL_BOOKS_ERROR;
};
export type SearchAllBooksActions =
  | SearchAllBooksRequestAction
  | SearchAllBooksSuccessAction
  | SearchAllBooksFailureAction
  | ClearSearchAllBooksAction;

// GET BOOK DETAILS
export type GetBookDetailsState = {
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
export type GetBookDetailsActions =
  | GetBookDetailsRequestAction
  | GetBookDetailsSuccessAction
  | GetBookDetailsFailureAction
  | ClearGetBookDetailsAction;

// ADD BOOK
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

// AUTHORS
export type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  biography: string;
  books: Book[];
};
export type GetAuthorsState = {
  loading: boolean;
  error: Error | null;
  authors: Author[];
};
export type GetAllAuthorsRequestAction = {
  type: typeof GET_ALL_AUTHORS_REQUEST;
};
export type GetAllAuthorsSuccessAction = {
  type: typeof GET_ALL_AUTHORS_SUCCESS;
  payload: {
    authors: Author[];
  };
};
export type GetAllAuthorsFailureAction = {
  type: typeof GET_ALL_AUTHORS_FAILURE;
  payload: {
    error: Error;
  };
};
export type ClearGetAllAuthorsAction = {
  type: typeof CLEAR_GET_ALL_AUTHORS_ERROR;
};
export type GetAuthorsActions =
  | GetAllAuthorsRequestAction
  | GetAllAuthorsSuccessAction
  | GetAllAuthorsFailureAction
  | ClearGetAllAuthorsAction;

// SEARCH AUTHORS
export type SearchAuthorsState = {
  loading: boolean;
  error: Error | null;
  authors: Author[];
  count: number;
};
export type SearchAllAuthorsRequestAction = {
  type: typeof SEARCH_ALL_AUTHORS_REQUEST;
};
export type SearchAllAuthorsSuccessAction = {
  type: typeof SEARCH_ALL_AUTHORS_SUCCESS;
  payload: {
    authors: Author[];
    count: number;
  };
};
export type SearchAllAuthorsFailureAction = {
  type: typeof SEARCH_ALL_AUTHORS_FAILURE;
  payload: {
    error: Error;
  };
};
export type ClearSearchAllAuthorsAction = {
  type: typeof CLEAR_SEARCH_ALL_AUTHORS_ERROR;
};
export type SearchAllAuthorsActions =
  | SearchAllAuthorsRequestAction
  | SearchAllAuthorsSuccessAction
  | SearchAllAuthorsFailureAction
  | ClearSearchAllAuthorsAction;

// GET AUTHOR DETAILS
export type GetAuthorDetailsState = {
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
export type GetAuthorDetailsActions =
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

// ALL BORROWS
export type Borrow = {
  _id: string;
  user: User;
  book: Book;
  borrowDate: Date;
  dueDate: Date;
};
export type GetBorrowsState = {
  loading: boolean;
  error: Error | null;
  borrows: Borrow[];
};
export type GetAllBorrowsRequestAction = {
  type: typeof GET_ALL_BORROWS_REQUEST;
};
export type GetAllBorrowsSuccessAction = {
  type: typeof GET_ALL_BORROWS_SUCCESS;
  payload: {
    borrows: Borrow[];
  };
};
export type GetAllBorrowsFailureAction = {
  type: typeof GET_ALL_BORROWS_FAILURE;
  payload: {
    error: Error;
  };
};
export type ClearGetAllBorrowsAction = {
  type: typeof CLEAR_GET_ALL_BORROWS_ERROR;
};
export type GetBorrowsActions =
  | GetAllBorrowsRequestAction
  | GetAllBorrowsSuccessAction
  | GetAllBorrowsFailureAction
  | ClearGetAllBorrowsAction;

// BORROW
export type BorrowRequest = {
  userEmail: string;
  bookIds: string[];
  borrowDate: Date;
  dueDate: Date;
};
export type BorrowState = {
  loading: boolean;
  error: Error | null;
  borrowed: boolean;
};
export type BorrowRequestAction = {
  type: typeof BORROW_REQUEST;
};
export type BorrowSuccessAction = {
  type: typeof BORROW_SUCCESS;
};
export type BorrowFailureAction = {
  type: typeof BORROW_FAILURE;
  payload: {
    error: Error;
  };
};
export type ResetBorrowAction = {
  type: typeof RESET_BORROW;
};
export type ClearBorrowErrorAction = {
  type: typeof CLEAR_BORROW_ERROR;
};
export type BorrowActions =
  | BorrowRequestAction
  | BorrowSuccessAction
  | BorrowFailureAction
  | ResetBorrowAction
  | ClearBorrowErrorAction;

// RETURN
export type ReturnBookState = {
  loading: boolean;
  error: Error | null;
  returned: boolean;
};
export type ReturnBookRequestAction = {
  type: typeof RETURN_BOOK_REQUEST;
};
export type ReturnBookSuccessAction = {
  type: typeof RETURN_BOOK_SUCCESS;
};
export type ReturnBookFailureAction = {
  type: typeof RETURN_BOOK_FAILURE;
  payload: {
    error: Error;
  };
};
export type ResetReturnBookAction = {
  type: typeof RESET_RETURN_BOOK;
};
export type ClearReturnBookErrorAction = {
  type: typeof CLEAR_RETURN_BOOK_ERROR;
};
export type ReturnBookActions =
  | ReturnBookRequestAction
  | ReturnBookSuccessAction
  | ReturnBookFailureAction
  | ResetReturnBookAction
  | ClearReturnBookErrorAction;
