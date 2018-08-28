import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

export class Home extends Component {
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
      </Wrapper>
    );
  }
}

Home.propTypes = {
  isLogin: PropTypes.bool,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  toggleLandingPageHandler: PropTypes.func,
  toggleModalOnSigninHandler: PropTypes.func,
  toggleModalOnLoginHandler: PropTypes.func,
  showLandingPage: PropTypes.bool,
};

Home.defaultProps = {
  isLogin: true,
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
