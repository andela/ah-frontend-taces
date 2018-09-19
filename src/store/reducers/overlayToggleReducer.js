import { OPEN_OVERLAY, CLOSE_OVERLAY } from '../actions/actionTypes';

const initialize = {
  openOverlay: false,
};

const overlayToggleReducer = (state = initialize, action) => {
  switch (action.type) {
    case OPEN_OVERLAY:
      return {
        ...state,
        openOverlay: true,
      };
    case CLOSE_OVERLAY:
      return {
        ...state,
        openOverlay: false,
      };

    default:
      break;
  }
  return state;
};

export default overlayToggleReducer;
