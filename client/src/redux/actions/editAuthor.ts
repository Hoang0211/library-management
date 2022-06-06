import { Dispatch } from 'redux';
import axios from 'axios';

import {
  EDIT_AUTHOR_REQUEST,
  EDIT_AUTHOR_SUCCESS,
  EDIT_AUTHOR_FAILURE,
  RESET_EDIT_AUTHOR,
  CLEAR_EDIT_AUTHOR_ERROR,
} from '../../constants/authorConstants';
import { EditAuthorActions, Author, isAxiosError } from '../../types';

export function editAuthorRequest(): EditAuthorActions {
  return {
    type: EDIT_AUTHOR_REQUEST,
  };
}

export function editAuthorSuccess(): EditAuthorActions {
  return {
    type: EDIT_AUTHOR_SUCCESS,
  };
}

export function editAuthorFailure(error: Error): EditAuthorActions {
  return {
    type: EDIT_AUTHOR_FAILURE,
    payload: {
      error,
    },
  };
}

export function editAuthor(
  token: string,
  authorId: string,
  author: Partial<Author>
) {
  return async (dispatch: Dispatch) => {
    dispatch(editAuthorRequest());
    try {
      await axios.put(
        `http://localhost:5000/api/v1/authors/${authorId}`,
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
      return dispatch(editAuthorSuccess());
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(editAuthorFailure(err));
      }
    }
  };
}

export function resetEditAuthor(): EditAuthorActions {
  return {
    type: RESET_EDIT_AUTHOR,
  };
}

export function clearEditAuthorError(): EditAuthorActions {
  return {
    type: CLEAR_EDIT_AUTHOR_ERROR,
  };
}
