import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import classes from '../../CSS/SocialLogin.css';
import { LOGIN_SUCCESS, CLOSE_MODAL } from '../../store/actions/actionTypes';

export class FacebookLoginComponent extends Component {
  responseFacebook = fbResponse => {
    console.log(fbResponse.accessToken);
    const data = { user: { fbauth_token: fbResponse.accessToken } };
    axios
      .post('https://authors-haven-tabs.herokuapp.com/api/users/fbauth/', data)
      .then(response => {
        this.handleResponse(response, fbResponse);
      });
  };

  handleResponse = (response, fbResponse) => {
    const { MAKEAUTHENTIC, CLOSE_MODAL_ACTION } = this.props;
    localStorage.setItem('token', response.data.user.token);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('email', response.data.user.email);
    localStorage.setItem('picture', fbResponse.picture.data.url);
    MAKEAUTHENTIC();
    CLOSE_MODAL_ACTION();
  };

  render() {
    const { click } = this.props;
    return (
      <div>
        <FacebookLogin
          appId="449016698953701"
          autoLoad={false}
          callback={this.responseFacebook}
          cssClass={[classes.socialButtons, classes.buttonFacebook].join(' ')}
          textButton="Login with Facebook"
          fields="name,email,picture"
          onClick={click}
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

export default connect(
  null,
  mapDispatchToProps,
)(FacebookLoginComponent);
