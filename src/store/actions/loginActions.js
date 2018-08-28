import axios from 'axios';
import {
  CLOSE_MODAL, LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS,
} from './actionTypes';

const loginStart = () => {
  return {
    // create an action type for login start
    type: LOGIN_START,
  };
};

const loginFail = error => {
  return {
    // create an action type for login fail
    type: LOGIN_FAIL,
    payload: error,
  };
};

const loginSuccess = response => {
  return {
    // create an action type on login success
    type: LOGIN_SUCCESS,
    payload: response,
  };
};

const loginUser = data => {
  return dispatch => {
    dispatch(loginStart());

    // make an axios API call and post json data
    axios
      .post('https://authors-haven-tabs.herokuapp.com/api/users/login/', data)
      .then(response => {
        // set username, email and tokens in local storage
        localStorage.setItem('token', response.data.user.token);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);

        // dispatch an action to the success reducer method
        dispatch(loginSuccess(response));
        dispatch({ type: CLOSE_MODAL });
      })
      .catch((error) => {
        // create a message variable to hold messages
        try {
          // create a message on login failure
          const [message] = error.response.data.errors.error;
          dispatch(loginFail(message));
        } catch (CatchError) {
          // message displayed when there is not internet access
          const [message] = 'You seem to be offline, check your connection.';
          dispatch(loginFail(message));
        }
      });
  };
};

export default loginUser;
