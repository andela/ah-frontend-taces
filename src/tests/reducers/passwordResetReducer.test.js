import passwordResetReducer from '../../store/reducers/passwordResetReducer';
import {
  PASSWORD_RESET_START, PASSWORD_RESET_FAIL, PASSWORD_RESET_SUCCESS,
} from '../../store/actions/actionTypes';

describe('test password reset reducer', () => {
  it('should return the initial state', () => {
    const loading = false;
    const message = false;

    const newState = passwordResetReducer(undefined, {});
    expect(newState.message).toEqual(message);
    expect(newState.loading).toEqual(loading);
    // expect(newState.toggleProfileDropdown).toEqual(toggleProfileDropdown);
  });

  it('start password reset procedure', () => {
    const loading = true;
    const message = false;

    const initialState = {
      loading: false,
      message: false,
    };

    const action = {
      type: PASSWORD_RESET_START,
    };

    const newState = passwordResetReducer(initialState, action);
    expect(newState.message).toEqual(message);
    expect(newState.loading).toEqual(loading);
    // expect(newState.toggleProfileDropdown).toEqual(toggleProfileDropdown);
  });

  it('fail password reset procedure', () => {
    const loading = false;
    const message = 'email not found.';

    const initialState = {
      loading: false,
      message: false,
    };

    const action = {
      type: PASSWORD_RESET_FAIL,
      payload: 'email not found.',
    };

    const newState = passwordResetReducer(initialState, action);
    expect(newState.message).toEqual(message);
    expect(newState.loading).toEqual(loading);
  });

  it('test password reset success', () => {
    const loading = false;
    const message = 'email link sent succesfull.';

    const initialState = {
      loading: false,
      message: false,
    };

    const action = {
      type: PASSWORD_RESET_SUCCESS,
      payload: 'email link sent succesfull.',
    };

    const newState = passwordResetReducer(initialState, action);
    expect(newState.message).toEqual(message);
    expect(newState.loading).toEqual(loading);
  });
});
