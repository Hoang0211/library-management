import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_ALL_AUTHOR_REQUEST,
  GET_ALL_AUTHOR_SUCCESS,
  GET_ALL_AUTHOR_FAILURE,
  GET_AUTHOR_DETAILS_REQUEST,
  GET_AUTHOR_DETAILS_SUCCESS,
  GET_AUTHOR_DETAILS_FAILURE,
} from '../../constants/authorConstants';
import { AuthorActions, Author, isAxiosError } from '../../types';

export function getAllAuthorRequest(): AuthorActions {
  return {
    type: GET_ALL_AUTHOR_REQUEST,
  };
}

export function getAllAuthorSuccess(authors: Author[]): AuthorActions {
  return {
    type: GET_ALL_AUTHOR_SUCCESS,
    payload: {
      authors,
    },
  };
}

export function getAllAuthorFailure(error: Error): AuthorActions {
  return {
    type: GET_ALL_AUTHOR_FAILURE,
    payload: {
      error,
    },
  };
}

export function getAllAuthor() {
  return async (dispatch: Dispatch) => {
    dispatch(getAllAuthorRequest());
    try {
      const res = await axios.get('http://localhost:5000/api/v1/authors');
      const authors = res.data;
      return dispatch(getAllAuthorSuccess(authors));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getAllAuthorFailure(err));
      }
    }
  };
}

export function getAuthorDetailsRequest(): AuthorActions {
  return {
    type: GET_AUTHOR_DETAILS_REQUEST,
  };
}

export function getAuthorDetailsSuccess(author: Author): AuthorActions {
  return {
    type: GET_AUTHOR_DETAILS_SUCCESS,
    payload: {
      author,
    },
  };
}

export function getAuthorDetailsFailure(error: Error): AuthorActions {
  return {
    type: GET_AUTHOR_DETAILS_FAILURE,
    payload: {
      error,
    },
  };
}

export function getAuthorDetails(authorId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(getAuthorDetailsRequest());
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/authors/${authorId}`
      );
      const author = res.data;
      return dispatch(getAuthorDetailsSuccess(author));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getAuthorDetailsFailure(err));
      }
    }
  };
}
