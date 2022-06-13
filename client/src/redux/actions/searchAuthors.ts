import { Dispatch } from 'redux';
import axios from 'axios';

import {
  SEARCH_ALL_AUTHORS_REQUEST,
  SEARCH_ALL_AUTHORS_SUCCESS,
  SEARCH_ALL_AUTHORS_FAILURE,
  CLEAR_SEARCH_ALL_AUTHORS_ERROR,
} from '../../constants/authorConstants';
import { SearchAllAuthorsActions, Author, isAxiosError } from '../../types';

export function searchAllAuthorsRequest(): SearchAllAuthorsActions {
  return {
    type: SEARCH_ALL_AUTHORS_REQUEST,
  };
}

export function searchAllAuthorsSuccess(
  authors: Author[],
  count: number
): SearchAllAuthorsActions {
  return {
    type: SEARCH_ALL_AUTHORS_SUCCESS,
    payload: {
      authors,
      count,
    },
  };
}

export function searchAllAuthorsFailure(error: Error): SearchAllAuthorsActions {
  return {
    type: SEARCH_ALL_AUTHORS_FAILURE,
    payload: {
      error,
    },
  };
}

export function searchAllAuthors(
  keyword: string,
  limit: string,
  page: string,
  sortedBy: string,
  sortOrder: string
) {
  return async (dispatch: Dispatch) => {
    dispatch(searchAllAuthorsRequest());
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/authors/search?keyword=${keyword}&limit=${limit}&page=${page}&sortedBy=${sortedBy}&sortOrder=${sortOrder}`
      );
      const { authors, count } = res.data;
      return dispatch(searchAllAuthorsSuccess(authors, count));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(searchAllAuthorsFailure(err));
      }
    }
  };
}

export function clearSearchAllAuthorsError(): SearchAllAuthorsActions {
  return {
    type: CLEAR_SEARCH_ALL_AUTHORS_ERROR,
  };
}
