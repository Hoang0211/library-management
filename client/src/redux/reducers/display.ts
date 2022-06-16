import { CHANGE_CURRENT_DISPLAY } from '../../constants/displayConstants';
import { DisplayState, DisplayActions } from '../../types';

export default function display(
  state: DisplayState = {
    currentDisplay: 'books',
  },
  action: DisplayActions
): DisplayState {
  switch (action.type) {
    case CHANGE_CURRENT_DISPLAY:
      if (state.currentDisplay === 'books') {
        return {
          currentDisplay: 'authors',
        };
      } else {
        return {
          currentDisplay: 'books',
        };
      }
    default:
      return state;
  }
}
