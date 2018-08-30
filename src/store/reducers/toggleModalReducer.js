import {
  OPEN_MODAL_TO_LOGIN, OPEN_MODAL_TO_REGISTRATION, CLOSE_MODAL, SWITCH_TO_MODAL_TO_LOGIN,
  SWITCH_TO_MODAL_TO_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  showModal: false,
  isLogin: true,
  isSuccess: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_TO_LOGIN:
      return {
        ...state,
        showModal: true,
        isLogin: true,
        isSuccess: false,
      };
    case OPEN_MODAL_TO_REGISTRATION:
      return {
        ...state,
        showModal: true,
        isLogin: false,
        isSuccess: false,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        isLogin: true,
        isSuccess: false,
      };
    case SWITCH_TO_MODAL_TO_LOGIN:
      return {
        ...state,
        isLogin: true,
        isSuccess: false,
      };
    case SWITCH_TO_MODAL_TO_SUCCESS:
      return {
        ...state,
        isSuccess: true,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
