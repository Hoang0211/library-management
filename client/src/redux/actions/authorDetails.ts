import { Dispatch } from 'redux';
import axios from 'axios';

import {
  GET_AUTHOR_DETAILS_REQUEST,
  GET_AUTHOR_DETAILS_SUCCESS,
  GET_AUTHOR_DETAILS_FAILURE,
  CLEAR_GET_AUTHOR_DETAILS_ERROR,
} from '../../constants/authorConstants';
import { AuthorDetailsActions, Author, isAxiosError } from '../../types';

export function getAuthorDetailsRequest(): AuthorDetailsActions {
  return {
    type: GET_AUTHOR_DETAILS_REQUEST,
  };
}

export function getAuthorDetailsSuccess(author: Author): AuthorDetailsActions {
  return {
    type: GET_AUTHOR_DETAILS_SUCCESS,
    payload: {
      author,
    },
  };
}

export function getAuthorDetailsFailure(error: Error): AuthorDetailsActions {
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

export function clearGetAuthorDetailsError(): AuthorDetailsActions {
  return {
    type: CLEAR_GET_AUTHOR_DETAILS_ERROR,
  };
}
