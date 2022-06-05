import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_ALL_AUTHOR_REQUEST,
  GET_ALL_AUTHOR_SUCCESS,
  GET_ALL_AUTHOR_FAILURE,
} from '../../constants/authorConstants';
import { AuthorsActions, Author, isAxiosError } from '../../types';

export function getAllAuthorRequest(): AuthorsActions {
  return {
    type: GET_ALL_AUTHOR_REQUEST,
  };
}

export function getAllAuthorSuccess(authors: Author[]): AuthorsActions {
  return {
    type: GET_ALL_AUTHOR_SUCCESS,
    payload: {
      authors,
    },
  };
}

export function getAllAuthorFailure(error: Error): AuthorsActions {
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
