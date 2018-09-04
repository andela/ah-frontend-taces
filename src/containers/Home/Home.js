import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import Landing from '../../components/Landing/Landing';
import {
  TOGGLE_LANDING_PAGE,
  CLOSE_MODAL,
  START_LOGIN,
  START_REGISTRATION,
} from '../../store/actions/actionTypes';
import Header from '../Header/Header';
import Popular from '../../components/Popular/Popular';
import Recent from '../../components/Recent/Recent';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { PasswordFillInForm } from '../passwordReset/PasswordFillInForm';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Holds all states local to this component
      passwordValidationMessage: null,
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const queryString = url.split('?')[1];
    const { toggleLandingPageHandler } = this.props;
    let token;
    try {
      token = queryString
        .replace('token=', '');
    } catch (err) {
      token = '';
    }
    if (token !== '' && token.length === 152) {
      toggleLandingPageHandler();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      this.setPasswordResetState({ passwordReset: true, token });
    }
  }

  // setstate to show the password reset modal
  setPasswordResetState = (values) => this.setState(values);

  // perform action when the paassword reset forms change value
  eventListener = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // perform action on password reset
  passResetSubmit = (event) => {
    const { ResetPassword, reTypePassword, token } = this.state;
    const { toggleModalOnLoginHandler, history } = this.props;
    const { push } = history;
    const data = { password: ResetPassword, retyped_password: reTypePassword };
    event.preventDefault();
    if (ResetPassword === reTypePassword && ResetPassword.length > 8 && !ResetPassword.match(/^[a-zA-Z0-9_]+$/)) {
      this.setState({ passwordValidationMessage: null, loadingPassReset: true });
      axios.put(`https://authors-haven-tabs.herokuapp.com/api/users/password/reset/${token}`, data)
        .then(() => {
          this.setState({ passwordReset: false });
          toggleModalOnLoginHandler();
          push('/');
        })
        .catch(() => {
          this.setState({ passwordValidationMessage: 'The password reset link seems to have expired.', loadingPassReset: false });
        });
    } else {
      this.setState({ passwordValidationMessage: 'Oops! Passwords either do not match or miss special characters.', loadingPassReset: false });
    }
  };

  render() {
    const {
      isLogin,
      closeModal,
      showModal,
      toggleLandingPageHandler,
      toggleModalOnSigninHandler,
      toggleModalOnLoginHandler,
      showLandingPage,
    } = this.props;

    const {
      passwordReset,
      passwordValidationMessage,
      loadingPassReset,
    } = this.state;
    const modal = isLogin ? (
      <Modal show={showModal} closeModal={closeModal}>
        <Login />
      </Modal>
    ) : (
      <Modal show={showModal} closeModal={closeModal}>
        <Register />
      </Modal>
    );
    return (
      <Wrapper>
        <div className="container py-5">
          <Header
            clickSignin={toggleModalOnLoginHandler}
            clickSignup={toggleModalOnSigninHandler}
          />
          <Popular />
          <Recent />
        </div>
        <Footer />
        <Landing closeLanding={toggleLandingPageHandler} show={showLandingPage} />
        {modal}
        <Modal show={passwordReset}>
          <PasswordFillInForm
          submit={this.passResetSubmit}
          passwordChangeEvent={this.eventListener}
          reTypePasswordEvent={this.eventListener}
          message={passwordValidationMessage}
          loadingPassReset={loadingPassReset}
          />
        </Modal>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  isLogin: PropTypes.func,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  toggleLandingPageHandler: PropTypes.func,
  toggleModalOnSigninHandler: PropTypes.func,
  toggleModalOnLoginHandler: PropTypes.func,
  showLandingPage: PropTypes.bool,
};

Home.defaultProps = {
  isLogin: () => {},
  closeModal: () => {},
  showModal: false,
  toggleLandingPageHandler: () => {},
  toggleModalOnSigninHandler: () => {},
  toggleModalOnLoginHandler: () => {},
  showLandingPage: true,
};

const mapStateToProps = state => {
  return {
    showLandingPage: state.landingReducer.showLanding,
    showModal: state.modalReducer.showModal,
    isLogin: state.modalReducer.isLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleLandingPageHandler: () => dispatch({ type: TOGGLE_LANDING_PAGE }),

    toggleModalOnLoginHandler: () => dispatch({ type: START_LOGIN }),

    toggleModalOnSigninHandler: () => dispatch({ type: START_REGISTRATION }),

    closeModal: () => dispatch({ type: CLOSE_MODAL }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
