import reducer from '../../store/reducers/registerReducer';
import {
  USER_REGISTRATION_START,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL,
} from '../../store/actions/actionTypes';

const initialState = {
  loading: false,
  registrationStatus: false,
  errors: {},
  user: {},
};

describe('registerReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading state to true when registration starts', () => {
    const action = { type: USER_REGISTRATION_START };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(true);
    expect(newState.registrationStatus).toEqual(false);
    expect(newState.errors).toEqual({});
    expect(newState.user).toEqual({});
  });

  it('should change loading state to false when registration fails', () => {
    const action = { type: USER_REGISTRATION_FAIL, payload: ['Some test error messages'] };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(false);
    expect(newState.registrationStatus).toEqual(false);
    expect(newState.errors[0]).toEqual('Some test error messages');
    expect(newState.user).toEqual({});
  });

  it('should change user state to user object and registration status to true', () => {
    const action = { type: USER_REGISTRATION_SUCCESS, payload: { user: 'testuserdata' } };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(false);
    expect(newState.registrationStatus).toEqual(true);
    expect(newState.errors).toEqual({});
    expect(newState.user).toEqual({ user: 'testuserdata' });
  });
});
