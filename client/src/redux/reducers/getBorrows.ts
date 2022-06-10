import {
  GET_ALL_BORROWS_REQUEST,
  GET_ALL_BORROWS_SUCCESS,
  GET_ALL_BORROWS_FAILURE,
  CLEAR_GET_ALL_BORROWS_ERROR,
} from '../../constants/borrowConstants';
import { GetBorrowsActions, GetBorrowsState } from '../../types';

export default function getBorrows(
  state: GetBorrowsState = {
    loading: false,
    error: null,
    borrows: [],
  },
  action: GetBorrowsActions
): GetBorrowsState {
  switch (action.type) {
    case GET_ALL_BORROWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_BORROWS_SUCCESS:
      return {
        ...state,
        loading: false,
        borrows: action.payload.borrows,
      };
    case GET_ALL_BORROWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case CLEAR_GET_ALL_BORROWS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
