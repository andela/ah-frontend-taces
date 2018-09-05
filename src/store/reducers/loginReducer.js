import {
  TOGGLE_PROFILE_DROPDOWN, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_START,
} from '../actions/actionTypes';

const initialize = {
  isAuthentic: localStorage.getItem('token') || false,
  loading: false,
  toggleProfileDropdown: false,
};

const authReducer = (state = initialize, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        message: '',
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
        isAuthentic: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthentic: true,
        message: '',
      };

    case TOGGLE_PROFILE_DROPDOWN:
      return {
        ...state,
        toggleProfileDropdown: !state.toggleProfileDropdown,
      };

    default:
      break;
  }
  return state;
};

export default authReducer;
