import { Dispatch } from 'redux';
import axios from 'axios';

import {
  SEARCH_ALL_BOOKS_REQUEST,
  SEARCH_ALL_BOOKS_SUCCESS,
  SEARCH_ALL_BOOKS_FAILURE,
  CLEAR_SEARCH_ALL_BOOKS_ERROR,
} from '../../constants/bookConstants';
import { SearchAllBooksActions, Book, isAxiosError } from '../../types';

export function searchAllBooksRequest(): SearchAllBooksActions {
  return {
    type: SEARCH_ALL_BOOKS_REQUEST,
  };
}

export function searchAllBooksSuccess(
  books: Book[],
  count: number
): SearchAllBooksActions {
  return {
    type: SEARCH_ALL_BOOKS_SUCCESS,
    payload: {
      books,
      count,
    },
  };
}

export function searchAllBooksFailure(error: Error): SearchAllBooksActions {
  return {
    type: SEARCH_ALL_BOOKS_FAILURE,
    payload: {
      error,
    },
  };
}

export function searchAllBooks(
  keyword: string,
  category: string,
  status: string,
  limit: string,
  page: string,
  sortedBy: string,
  sortOrder: string
) {
  return async (dispatch: Dispatch) => {
    dispatch(searchAllBooksRequest());
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/books/search?keyword=${keyword}&category=${category}&status=${status}&limit=${limit}&page=${page}&sortedBy=${sortedBy}&sortOrder=${sortOrder}`
      );
      const { books, count } = res.data;
      return dispatch(searchAllBooksSuccess(books, count));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(searchAllBooksFailure(err));
      }
    }
  };
}

export function clearSearchAllBooksError(): SearchAllBooksActions {
  return {
    type: CLEAR_SEARCH_ALL_BOOKS_ERROR,
  };
}
