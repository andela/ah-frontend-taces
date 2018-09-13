import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../store/actions/registerActions';
import { SWITCH_TO_MODAL_TO_LOGIN } from '../../store/actions/actionTypes';
import Spinner from '../../components/Spinner/Spinner';
import classes from '../../CSS/Register.css';

export class Register extends Component {
  state = {
    user: {
      username: '',
      email: '',
      password: '',
      callbackurl: window.location.href.toString(),
    },
    touched: {
      username: false,
      email: false,
      password: false,
    },
  };

  onChangeListener = event => {
    const { user, touched } = this.state;
    this.setState({
      user: { ...user, [event.target.name]: event.target.value },
      touched: { ...touched, [event.target.name]: true },
    });
  };

  validationHandler = inputName => {
    const { user, touched } = this.state;
    switch (inputName) {
      case 'username':
        if (user.username.length < 6 && touched.username) {
          return (
            <span
             className={classes.spanerrors}
             >
             Username needs to be at least 6 characters long.
            </span>
          );
        }
        break;
      case 'email':
        if (!user.email.match(/\S+@\S+\.\S+/) && touched.email) {
          return <span className={classes.spanerrors}>Enter a valid email format.</span>;
        }
        break;
      case 'password':
        if (user.password.length < 8 && touched.password) {
          return <span>Password needs to be at least 8 characters long.</span>;
        }
        if (user.password.match(/^[a-zA-Z0-9_]+$/) && touched.password) {
          return (
            <span className={classes.spanerrors}>
              Please include at least a number and any of these symbols in your password
              @,#,!,$,%,&,*,(,)
            </span>
          );
        }
        break;
      default:
        break;
    }
    return false;
  };

  onRegistrationSubmitEventHandler = event => {
    event.preventDefault();
    const { onRegister } = this.props;
    const { user } = this.state;
    onRegister({ user });
  };

  render() {
    const { loading, errors } = this.props;
    const usernameClasses = ['form-control no-border', errors.username ? classes.Error : null].join(' ');
    const emailClasses = ['form-control no-border', errors.email ? classes.Error : null].join(' ');
    const passwordClasses = ['form-control no-border', errors.password ? classes.Error : null].join(' ');

    const { touched } = this.state;
    const { onSwitchToLogin } = this.props;
    return (
      <div className="container">
        {loading ? <Spinner /> : null}
        <form
          onSubmit={event => this.onRegistrationSubmitEventHandler(event)}
          className={classes.Register}
        >
          <center><h3>Register on Authors Haven!</h3></center>
          <div className="form-group">
            <input
            className={usernameClasses}
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.onChangeListener}
          />
            <span className={classes.spanerrors}>{errors.username}</span>
            <span className={classes.spanerrors}>{this.validationHandler('username')}</span>
          </div>

          <div className="form-group">
            <input
            className={emailClasses}
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChangeListener}
          />
            <span className={classes.spanerrors}>{errors.email}</span>
            <span className={classes.spanerrors}>{this.validationHandler('email')}</span>
          </div>

          <div className="form-group">
            <input
            className={passwordClasses}
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.onChangeListener}
          />
            <span className={classes.spanerrors}>{errors.password}</span>
            <span className={classes.spanerrors}>{this.validationHandler('password')}</span>
          </div>


          {this.validationHandler('username')
          || this.validationHandler('email')
          || this.validationHandler('password')
          || (!touched.username
            || !touched.email
            || !touched.password) ? (
              <button className="btn btn-dark" type="submit" disabled> Register</button>
            ) : (
              <button className="btn btn-dark" type="submit" disabled={loading}>Register</button>
            )}
          <br />
          <center>
            <small> Already have an account? </small>
            <a href="#" onClick={onSwitchToLogin}><small>Login!</small></a>
          </center>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  onRegister: PropTypes.func,
  onSwitchToLogin: PropTypes.func,
};

Register.defaultProps = {
  loading: false,
  errors: {},
  onRegister: () => {},
  onSwitchToLogin: () => {},
};

const mapStateToProps = state => {
  return {
    user: state.registration.user,
    errors: state.registration.errors,
    loading: state.registration.loading,
    registrationStatus: state.registration.registrationStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: userData => dispatch(registerUser(userData)),
    onSwitchToLogin: () => dispatch({ type: SWITCH_TO_MODAL_TO_LOGIN }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
