import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginUser from '../../store/actions/loginActions';
import Alerts from '../../components/Alerts/Alerts';
import { LOGIN_SUCCESS, START_REGISTRATION } from '../../store/actions/actionTypes';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // holds all states
    };
  }

  componentDidMount() {
    const { MAKEAUTHENTIC } = this.props;
    axios.get(
      'https://authors-haven-tabs.herokuapp.com/api/user/',
      { headers: { Authorization: `Token ${localStorage.getItem('token')}` } },
    )
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

  loginSubmit = event => {
    const { AUTH } = this.props;
    const { email, password } = this.state;
    // take form data from states, and call the mapDispatchToProps function
    event.preventDefault();
    AUTH({
      user: { email, password },
    });
  };

  render() {
    const { message, loading, SHOW_SIGNUP } = this.props;
    return (
      <div className="container">
        <form onSubmit={this.loginSubmit}>
          <center><h3>Welcome Back!</h3></center>
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
          </div>

          <button className="btn btn-dark" disabled={loading}>Login</button>
          <br />
          <br />
          <center>
            <span><small> No Account? </small></span>
            <a href="#" onClick={SHOW_SIGNUP}><small>Create One!</small></a>
          </center>
        </form>
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
    SHOW_SIGNUP: () => dispatch({ type: START_REGISTRATION }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
