import axios from 'axios';
import {
  USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAIL, SWITCH_TO_MODAL_TO_SUCCESS,
} from './actionTypes';

export const userRegistrationStart = () => {
  return {
    type: USER_REGISTRATION_START,
  };
};

export const toSuccess = () => {
  return {
    type: SWITCH_TO_MODAL_TO_SUCCESS,
  };
};

export const userRegistrationSuccess = userData => {
  return {
    type: USER_REGISTRATION_SUCCESS,
    payload: userData,
  };
};

export const userRegistrationFail = errors => {
  return {
    type: USER_REGISTRATION_FAIL,
    payload: errors,
  };
};

export const registerUser = userData => {
  return dispatch => {
    dispatch(userRegistrationStart());
    return axios
      .post('https://authors-haven-tabs.herokuapp.com/api/users/', userData)
      .then(response => {
        dispatch(userRegistrationSuccess(response.data.user));
        dispatch(toSuccess());
      })
      .catch(error => {
        dispatch(userRegistrationFail(error.response.data.errors));
      });
  };
};
