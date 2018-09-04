import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../CSS/Modal.css';
import Loader from '../../components/Loader/Loader';

export const PasswordFillInForm = (props) => {
  const {
    passwordChangeEvent, reTypePasswordEvent, submit, message, loadingPassReset,
  } = props;
  return (
    <div>
      <center><h3>Reset You Password!</h3></center>
      {loadingPassReset
        ? (<center><Loader /></center>)
        : (null)
        }
      <form onSubmit={submit}>
        <div className="form-group">
          <input
            className="form-control no-border"
            placeholder="Password"
            onChange={passwordChangeEvent}
            name="ResetPassword"
            type="password"
            minLength="8"
            required
            />
          <small id="emailHelp" className="form-text text-muted">
            <span className={classes.password_reset_waring}>{message}</span>
          </small>
        </div>
        <div className="form-group">
          <input
            className="form-control no-border"
            placeholder="Re-type password"
            onChange={reTypePasswordEvent}
            name="reTypePassword"
            type="password"
            minLength="8"
            required
            />
        </div>
        <button className="btn btn-dark" type="submit" disabled={loadingPassReset}>Reset Password</button>
      </form>
    </div>
  );
};

// validate props of the PasswordFillInForm function
PasswordFillInForm.propTypes = {
  passwordChangeEvent: PropTypes.func,
  reTypePasswordEvent: PropTypes.func,
  message: PropTypes.string,
  submit: PropTypes.func,
  loadingPassReset: PropTypes.bool,
};

// add default values to the PasswordFillInForm props
PasswordFillInForm.defaultProps = {
  loadingPassReset: false,
  passwordChangeEvent: () => {},
  reTypePasswordEvent: () => {},
  submit: () => {},
  message: ' ',
};

export default PasswordFillInForm;
