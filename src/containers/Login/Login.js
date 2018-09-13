import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginUser from '../../store/actions/loginActions';
import Alerts from '../../components/Alerts/Alerts';
import PasswordReset from '../passwordReset/passwordReset';
import Loader from '../../components/Loader/Loader';
import { LOGIN_SUCCESS, OPEN_MODAL_TO_REGISTRATION } from '../../store/actions/actionTypes';
import FacebookLoginComponent from '../../components/SocialLogin/FacebookLogin';
import GoogleLoginComponent from '../../components/SocialLogin/GoogleLogin';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // holds all states
      showPasswordReset: false,
    };
  }

  componentDidMount() {
    const { MAKEAUTHENTIC } = this.props;
    axios
      .get('https://authors-haven-tabs.herokuapp.com/api/user/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
      .then(response => {
        MAKEAUTHENTIC();
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('email', response.data.user.email);
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
      });
  }

  // takes username and password and stores them in state by name
  eventListener = event => this.setState({ [event.target.name]: event.target.value });

  // show password reset forms when password link is clicked
  passwordReset = () => {
    const { showPasswordReset } = this.state;
    this.setState({ showPasswordReset: !showPasswordReset });
  };

  loginSubmit = event => {
    const { AUTH } = this.props;
    const { email, password } = this.state;
    // take form data from states, and call the mapDispatchToProps function
    event.preventDefault();
    AUTH({
      user: { email, password },
    });
  };

  // open loader when social auth is cliked
  loader = () => {
    this.setState({ loadingshow: true });
  }

  render() {
    const { message, loading, SHOW_SIGNUP } = this.props;
    const { showPasswordReset, loadingshow } = this.state;
    return (
      <div className="container">
        {showPasswordReset ? (
          <PasswordReset ShowLogin={this.passwordReset} />
        ) : (
          <form onSubmit={this.loginSubmit}>
            <center>
              <h3>Welcome Back!</h3>
            </center>
            <center>{loading ? <Loader /> : null}</center>
            {message ? <Alerts message={message} alertType="alert-danger" title="Error:" /> : null}
            <div className="form-group">
              <input
                type="email"
                className="form-control no-border"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                onChange={this.eventListener}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We&apos;ll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control no-border"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={this.eventListener}
                name="password"
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                <span>
                Forgot Password? &nbsp;
                  <a href="#" id="showPasswordReset" onClick={this.passwordReset}>
                  Reset password!
                  </a>
                </span>
              </small>
            </div>

            <button className="btn btn-dark" disabled={loading}>
              Login
            </button>
          </form>
        )}
        <br />
        <center>{loadingshow ? <Loader /> : <p>or</p>}</center>
        <FacebookLoginComponent click={this.loader} />
        <GoogleLoginComponent click={this.loader} />
        <center>
          <small> No Account? </small>
          <a href="#" onClick={SHOW_SIGNUP}>
            <small>Create One!</small>
          </a>
        </center>
      </div>
    );
  }
}

Login.propTypes = {
  AUTH: PropTypes.func,
  MAKEAUTHENTIC: PropTypes.func,
  message: PropTypes.string,
  loading: PropTypes.bool,
  SHOW_SIGNUP: PropTypes.func,
};

Login.defaultProps = {
  AUTH: () => {},
  MAKEAUTHENTIC: () => {},
  message: '',
  loading: true,
  SHOW_SIGNUP: () => {},
};

const mapStateToProps = state => {
  // map state to props
  return {
    authStatus: state.isAuthentic.isAuthentic,
    message: state.isAuthentic.message,
    loading: state.isAuthentic.loading,
  };
};

const mapDispatchToProps = dispatch => {
  // map dispatch to props
  return {
    // call the loginUser function that excutes api calls for login
    AUTH: data => dispatch(LoginUser(data)),
    MAKEAUTHENTIC: () => dispatch({ type: LOGIN_SUCCESS }),
    SHOW_SIGNUP: () => dispatch({ type: OPEN_MODAL_TO_REGISTRATION }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
