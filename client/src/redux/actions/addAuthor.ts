import { Dispatch } from 'redux';
import axios from 'axios';

import {
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  ADD_AUTHOR_FAILURE,
  RESET_ADD_AUTHOR,
  CLEAR_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { AddAuthorActions, Author, isAxiosError } from '../../types';

export function addAuthorRequest(): AddAuthorActions {
  return {
    type: ADD_AUTHOR_REQUEST,
  };
}

export function addAuthorSuccess(author: Author): AddAuthorActions {
  return {
    type: ADD_AUTHOR_SUCCESS,
    payload: {
      author,
    },
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
      const res = await axios.post(
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
      const addedAuthor = res.data;
      return dispatch(addAuthorSuccess(addedAuthor));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(addAuthorFailure(err));
      }
    }
  };
}

export function resetAddAuthor() {
  return {
    type: RESET_ADD_AUTHOR,
  };
}

export function clearAuthorError() {
  return {
    type: CLEAR_AUTHOR_ERROR,
  };
}
