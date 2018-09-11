/**
 * This file is a stateful component that sends
 * password reset links to a user of authors haven
 * that has forgotten his/her password, it stores
 * some of it's states locally uses and also uses
 * redux to manage some states
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resetUserPassword from '../../store/actions/passwordResetActions';
import Alerts from '../../components/Alerts/Alerts';
import Loader from '../../components/Loader/Loader';

export class PasswordReset extends Component {
  state = {
    // holds all states local to this component.
    // i.e. form data (email only).
  };


  // takes email and store it in state by name (email only).
  eventListener = event => this.setState({ [event.target.name]: event.target.value });


  // make password reset HTTP request.
  passwordResetHttpCall = (request) => {
    // prevent default submit action
    request.preventDefault();

    // get passReset state containing form data i.e email
    const { passReset } = this.state;

    // create data to be sent over HTTP using axios
    // This contains the email variable the reset link will be sent to.
    const data = { email: passReset, callbackurl: window.location.href.toString() };

    // create destructured prop
    const { sendRequest } = this.props;

    // make HTTP request to reset password
    sendRequest(data);
  };

  // check message type
  checkAlertType = (messageSentBack) => {
    if (messageSentBack === 'Oops! Email not found.') {
      return 'alert-danger';
    }

    return 'alert-success';
  }

  render() {
    // create destructured prop holding states used in the render method
    const { PasswordResetMessage, loadingState, ShowLogin } = this.props;

    return (
      <div>
        <center><h3>Reset You Password!</h3></center>
        <center>
          {loadingState ? <Loader /> : null}
          { PasswordResetMessage ? (
            <Alerts
          alertType={this.checkAlertType(PasswordResetMessage)}
          title="Message:"
          message={PasswordResetMessage}
          />
          ) : null }
        </center>
        <form onSubmit={this.passwordResetHttpCall}>
          <div className="form-group">
            <input className="form-control no-border" placeholder="Enter email to reset password" type="email" name="passReset" onChange={this.eventListener} required />
            <small id="emailHelp" className="form-text text-muted">
              <span>Lost your way? </span>
              <a href="#" onClick={ShowLogin}> Go back to login.</a>
            </small>
          </div>
          <button className="btn btn-dark" type="submit" disabled={loadingState}>Reset Password</button>
        </form>
      </div>
    );
  }
}

// validate all props used in the passwordReset class
PasswordReset.propTypes = {
  PasswordResetMessage: PropTypes.string,
  loadingState: PropTypes.bool,
  sendRequest: PropTypes.func,
  ShowLogin: PropTypes.bool,
};

// give default values to all props used in the passwordReset class
PasswordReset.defaultProps = {
  PasswordResetMessage: ' ',
  loadingState: false,
  sendRequest: () => {},
  ShowLogin: () => {},
};

// map state to props
const mapStateToProps = state => ({
  loadingState: state.loading.loading,
  PasswordResetMessage: state.loading.message,
});

// map dispatch to props
const mapDispatchToProps = dispatch => ({
  // call the resetUserPassword function that excutes api calls for password reset
  sendRequest: data => dispatch(resetUserPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
