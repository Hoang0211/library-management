import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_ALL_AUTHORS_REQUEST,
  GET_ALL_AUTHORS_SUCCESS,
  GET_ALL_AUTHORS_FAILURE,
  CLEAR_GET_ALL_AUTHORS_ERROR,
} from '../../constants/authorConstants';
import { GetAuthorsActions, Author, isAxiosError } from '../../types';

export function getAllAuthorsRequest(): GetAuthorsActions {
  return {
    type: GET_ALL_AUTHORS_REQUEST,
  };
}

export function getAllAuthorsSuccess(authors: Author[]): GetAuthorsActions {
  return {
    type: GET_ALL_AUTHORS_SUCCESS,
    payload: {
      authors,
    },
  };
}

export function getAllAuthorsFailure(error: Error): GetAuthorsActions {
  return {
    type: GET_ALL_AUTHORS_FAILURE,
    payload: {
      error,
    },
  };
}

export function getAllAuthors() {
  return async (dispatch: Dispatch) => {
    dispatch(getAllAuthorsRequest());
    try {
      const res = await axios.get('http://localhost:5000/api/v1/authors');
      const authors = res.data;
      return dispatch(getAllAuthorsSuccess(authors));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getAllAuthorsFailure(err));
      }
    }
  };
}

export function clearGetAllAuthorsError(): GetAuthorsActions {
  return {
    type: CLEAR_GET_ALL_AUTHORS_ERROR,
  };
}
