/**
 * This file is a middleware for the password reset functionality
 * It comes runs between the passwordResetReducer and
 * the passwordReset component, It is a stateless files
 */
import axios from 'axios';
import { PASSWORD_RESET_START, PASSWORD_RESET_FAIL, PASSWORD_RESET_SUCCESS } from './actionTypes';

const passwordResetStart = () => ({
  // create an action type for login start
  type: PASSWORD_RESET_START,
});

const passwordResetFail = error => ({
  // create an action type for login fail
  type: PASSWORD_RESET_FAIL,
  payload: error,
});

const passwordResetSuccess = response => ({
  // create an action type on login success
  type: PASSWORD_RESET_SUCCESS,
  payload: response,
});

const resetUserPassword = data => (dispatch) => {
  dispatch(passwordResetStart());
  // Make an HTTP call to reset password
  return axios
    .post('https://authors-haven-tabs.herokuapp.com/api/users/password/forgot/', data)

  // perform action on a successfull HTTP request
    .then(() => dispatch(passwordResetSuccess('Check you email for a reset link.')))

  // perform action on an unsuccessfull HTTP request
    .catch(() => {
      dispatch(passwordResetFail('Oops! Email not found.'));
    });
};

export default resetUserPassword;
