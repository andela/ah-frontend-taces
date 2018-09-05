import authReducer from '../../store/reducers/loginReducer';
import {
  TOGGLE_PROFILE_DROPDOWN, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_START,
} from '../../store/actions/actionTypes';

describe('toggleLandingPageReducer', () => {
  it('should return the initial state', () => {
    
    const isAuthentic = false;
    const loading = false;
    const toggleProfileDropdown = false;

    const newState = authReducer(undefined, {});
    expect(newState.isAuthentic).toEqual(isAuthentic);
    expect(newState.loading).toEqual(loading);
    expect(newState.toggleProfileDropdown).toEqual(toggleProfileDropdown);
  });

  it('enabling the profile picture dropdown', () => {
    const isAuthentic = false;
    const loading = false;
    const toggleProfileDropdown = true;

    const initialState = {
      isAuthentic: false,
      loading: false,
      toggleProfileDropdown: false,
    };

    const action = {
      type: TOGGLE_PROFILE_DROPDOWN,
    };

    const newState = authReducer(initialState, action);
    expect(newState.isAuthentic).toEqual(isAuthentic);
    expect(newState.loading).toEqual(loading);
    expect(newState.toggleProfileDropdown).toEqual(toggleProfileDropdown);
  });

  it('should change the state of isAuth to true', () => {
    const isAuthentic = true;
    const loading = false;
    const toggleProfileDropdown = false;

    const initialState = {
      isAuthentic: false,
      loading: false,
      toggleProfileDropdown: false,
    };

    const action = {
      type: LOGIN_SUCCESS,
    };

    const newState = authReducer(initialState, action);
    expect(newState.isAuthentic).toEqual(isAuthentic);
    expect(newState.loading).toEqual(loading);
    expect(newState.toggleProfileDropdown).toEqual(toggleProfileDropdown);
  });

  it('should change the state of isAuth to false', () => {
    const isAuthentic = false;
    const loading = false;
    const toggleProfileDropdown = false;

    const initialState = {
      isAuthentic: false,
      loading: false,
      toggleProfileDropdown: false,
    };

    const action = {
      type: LOGIN_FAIL,
    };

    const newState = authReducer(initialState, action);
    expect(newState.isAuthentic).toEqual(isAuthentic);
    expect(newState.loading).toEqual(loading);
    expect(newState.toggleProfileDropdown).toEqual(toggleProfileDropdown);
  });

  it('should start login process and create request while loadind', () => {
    const isAuthentic = false;
    const loading = true;
    const toggleProfileDropdown = false;

    const initialState = {
      isAuthentic: false,
      loading: false,
      toggleProfileDropdown: false,
    };

    const action = {
      type: LOGIN_START,
    };

    const newState = authReducer(initialState, action);
    expect(newState.isAuthentic).toEqual(isAuthentic);
    expect(newState.loading).toEqual(loading);
    expect(newState.toggleProfileDropdown).toEqual(toggleProfileDropdown);
  });
});
