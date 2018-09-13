import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import PropTypes from 'prop-types';
import classes from '../../CSS/SocialLogin.css';
import { LOGIN_SUCCESS, CLOSE_MODAL } from '../../store/actions/actionTypes';

export class GoogleLoginComponent extends Component {
  responseGoogle = gGResponse => {
    const data = { user: { googleauth_token: gGResponse.tokenId } };
    axios
      .post('https://authors-haven-tabs.herokuapp.com/api/users/googleauth/', data)
      .then(response => {
        this.handleResponse(response, gGResponse);
      });
  };

  handleResponse = (response, gGResponse) => {
    const { MAKEAUTHENTIC, CLOSE_MODAL_ACTION } = this.props;
    localStorage.setItem('token', response.data.user.token);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('picture', gGResponse.profileObj.imageUrl);
    MAKEAUTHENTIC();
    CLOSE_MODAL_ACTION();
  };

  render() {
    const { click } = this.props;
    return (
      <div>
        <GoogleLogin
          clientId="875578574732-11ljkb40u79i6u4lbu9hjahmdc4e4nn5.apps.googleusercontent.com"
          buttonText="Login with Google"
          className={[classes.socialButtons, classes.buttonGoogle].join(' ')}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          onRequest={click}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  // map dispatch to props
  return {
    // make facebook logged in user authentic
    MAKEAUTHENTIC: () => dispatch({ type: LOGIN_SUCCESS }),
    CLOSE_MODAL_ACTION: () => dispatch({ type: CLOSE_MODAL }),
  };
};

GoogleLoginComponent.propTypes = {
  MAKEAUTHENTIC: PropTypes.func,
  CLOSE_MODAL_ACTION: PropTypes.func,
  click: PropTypes.func,

};

GoogleLoginComponent.defaultProps = {
  MAKEAUTHENTIC: () => {},
  CLOSE_MODAL_ACTION: () => {},
  click: () => {},

};

export default connect(null, mapDispatchToProps)(GoogleLoginComponent);
