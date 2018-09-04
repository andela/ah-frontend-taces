/**
 * This file holds states of the password reset component and
 * performs actions to changes states if the password reset
 * feature.
 */
import { PASSWORD_RESET_START, PASSWORD_RESET_FAIL, PASSWORD_RESET_SUCCESS } from '../actions/actionTypes';

// create a state for a that tells whether a request is in progress
// when the state is true, i means that a request is in progress
const initialize = {
  loading: false,
  message: false,
};


// This is a reducer that manages actions for password reset
const passwordResetReducer = (state = initialize, action) => {
  switch (action.type) {
    // perform action on start of password reset
    case PASSWORD_RESET_START:
      return {
        ...state,
        loading: true,
        message: false,
      };

    // perform action on fail of password reset
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    // perform action on success of password reset
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    // break if the action type in range of this actions available
    default:
      break;
  }
  // return state from this file
  return state;
};

export default passwordResetReducer;
