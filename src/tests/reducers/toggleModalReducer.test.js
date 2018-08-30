import reducer from '../../store/reducers/toggleModalReducer';
import {
  OPEN_MODAL_TO_LOGIN,
  OPEN_MODAL_TO_REGISTRATION,
  CLOSE_MODAL,
  SWITCH_TO_MODAL_TO_LOGIN,
} from '../../store/actions/actionTypes';

describe('togglModalReducer', () => {
  const initialState = {
    showModal: false,
    isLogin: true,
    isSuccess: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change the state of showModal to true when login starts', () => {
    const action = { type: OPEN_MODAL_TO_LOGIN };
    const newState = reducer(initialState, action);
    expect(newState.showModal).toEqual(true);
    expect(newState.isLogin).toEqual(true);
  });

  it('should change the state of isLogin to false', () => {
    const action = { type: OPEN_MODAL_TO_REGISTRATION };
    const newState = reducer(initialState, action);
    expect(newState.showModal).toEqual(true);
    expect(newState.isLogin).toEqual(false);
  });

  it('should change the state of showModal to false when close modal', () => {
    const action = { type: CLOSE_MODAL };
    const newState = reducer(initialState, action);
    expect(newState.showModal).toEqual(false);
    expect(newState.isLogin).toEqual(true);
  });

  it('should change the state of isLogin to true', () => {
    const action = { type: SWITCH_TO_MODAL_TO_LOGIN };
    const newState = reducer(initialState, action);
    expect(newState.isLogin).toEqual(true);
  });
});
