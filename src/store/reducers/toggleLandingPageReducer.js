import { TOGGLE_LANDING_PAGE } from '../actions/actionTypes';

const initialState = {
  showLanding: !localStorage.getItem('token'),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LANDING_PAGE:
      return {
        ...state,
        showLanding: false,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
