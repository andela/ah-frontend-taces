import {
  USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_FAIL,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  registrationStatus: false,
  errors: {},
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_START:
      return {
        ...state,
        loading: true,
        registrationStatus: false,
        errors: {},
      };
    case USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationStatus: true,
        loading: false,
        user: { ...action.payload },
        errors: {},
      };
    case USER_REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
        errors: { ...action.payload },
      };
    default:
      break;
  }
  return state;
};

export default reducer;
