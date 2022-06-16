import { CHANGE_CURRENT_DISPLAY } from '../../constants/displayConstants';
import { DisplayActions } from '../../types';

export function changeCurrentDisplay(): DisplayActions {
  return {
    type: CHANGE_CURRENT_DISPLAY,
  };
}
