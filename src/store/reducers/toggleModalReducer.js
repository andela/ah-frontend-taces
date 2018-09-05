import { START_LOGIN, START_REGISTRATION, CLOSE_MODAL } from '../actions/actionTypes';

const initialState = {
  showModal: false,
  isLogin: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        showModal: true,
        isLogin: true,
      };
    case START_REGISTRATION:
      return {
        ...state,
        showModal: true,
        isLogin: false,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        isLogin: true,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
