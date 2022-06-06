import { Dispatch } from 'redux';
import axios from 'axios';

import {
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  RESET_DELETE_AUTHOR,
  CLEAR_DELETE_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { DeleteAuthorActions, Author, isAxiosError } from '../../types';

export function deleteAuthorRequest(): DeleteAuthorActions {
  return {
    type: DELETE_AUTHOR_REQUEST,
  };
}

export function deleteAuthorSuccess(author: Author): DeleteAuthorActions {
  return {
    type: DELETE_AUTHOR_SUCCESS,
    payload: {
      author,
    },
  };
}

export function deleteAuthorFailure(error: Error): DeleteAuthorActions {
  return {
    type: DELETE_AUTHOR_FAILURE,
    payload: {
      error,
    },
  };
}

export function deleteAuthor(token: string, authorId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(deleteAuthorRequest());
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/authors/${authorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const deletedAuthor = res.data;
      return dispatch(deleteAuthorSuccess(deletedAuthor));
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(deleteAuthorFailure(err));
      }
    }
  };
}

export function resetDeleteAuthor(): DeleteAuthorActions {
  return {
    type: RESET_DELETE_AUTHOR,
  };
}

export function clearDeleteAuthorError(): DeleteAuthorActions {
  return {
    type: CLEAR_DELETE_AUTHOR_ERROR,
  };
}
