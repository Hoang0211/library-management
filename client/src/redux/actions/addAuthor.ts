import { Dispatch } from 'redux';
import axios from 'axios';

import {
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  RESET_ADD_AUTHOR,
  CLEAR_ADD_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { AddAuthorActions, Author, isAxiosError } from '../../types';

export function addAuthorRequest(): AddAuthorActions {
  return {
    type: ADD_AUTHOR_REQUEST,
  };
}

export function addAuthorSuccess(): AddAuthorActions {
  return {
    type: ADD_AUTHOR_SUCCESS,
  };
}

export function addAuthorFailure(error: Error): AddAuthorActions {
  return {
    type: ADD_AUTHOR_FAILURE,
    payload: {
      error,
    },
  };
}

export function addAuthor(token: string, author: Partial<Author>) {
  return async (dispatch: Dispatch) => {
    dispatch(addAuthorRequest());
    try {
      await axios.post(
        `http://localhost:5000/api/v1/authors/`,
        {
          firstName: author.firstName,
          lastName: author.lastName,
          biography: author.biography,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return dispatch(addAuthorSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(addAuthorFailure(err));
      }
    }
  };
}

export function resetAddAuthor(): AddAuthorActions {
  return {
    type: RESET_ADD_AUTHOR,
  };
}

export function clearAddAuthorError(): AddAuthorActions {
  return {
    type: CLEAR_ADD_AUTHOR_ERROR,
  };
}
