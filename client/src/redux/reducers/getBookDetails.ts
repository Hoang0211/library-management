import {
  GET_BOOK_DETAILS_REQUEST,
  GET_BOOK_DETAILS_SUCCESS,
  GET_BOOK_DETAILS_FAILURE,
  CLEAR_GET_BOOK_DETAILS_ERROR,
} from '../../constants/bookConstants';
import { GetBookDetailsState, GetBookDetailsActions } from '../../types';

export default function getBookDetails(
  state: GetBookDetailsState = {
    loading: false,
    error: null,
    book: null,
  },
  action: GetBookDetailsActions
): GetBookDetailsState {
  switch (action.type) {
    case GET_BOOK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        book: null,
      };
    case GET_BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        book: action.payload.book,
      };
    case GET_BOOK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_GET_BOOK_DETAILS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
