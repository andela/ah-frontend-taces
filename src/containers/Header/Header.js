import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from '../../CSS/Header.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import { TOGGLE_PROFILE_DROPDOWN, OPEN_MODAL_TO_LOGIN, OPEN_MODAL_TO_REGISTRATION } from '../../store/actions/actionTypes';

const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('username');
};

export class Header extends Component {
  render() {
    const topHeaderDivClasses = ['d-flex align-items-center', classes.topheader].join(' ');
    const {
      authStatus,
      ProfileDropdownState,
      TOGGLE_PROFILE_ACTION,
      clickSignin,
      clickSignup,
    } = this.props;
    return (
      <Wrapper>
        <div className="container py-5">
          <div className={topHeaderDivClasses}>
            <h1 className="mx-auto pl-2">
              {''}

              <NavLink to="/">AUTHORS HAVEN</NavLink>

              {''}
            </h1>
            {authStatus
              ? (
                <div>
                  <a href="#" onClick={TOGGLE_PROFILE_ACTION}>
                    <img src={localStorage.getItem('picture')} className={classes.profile_picture} alt="Cinque Terre" width="50" height="50" />
                  </a>
                  {ProfileDropdownState
                    ? (
                      <div className={classes.profile_drop_down}>
                        <center>{localStorage.getItem('username')}</center>
                        <div><small><center>{localStorage.getItem('email')}</center></small></div>
                        <div className="dropdown-divider" />
                        <NavLink className="dropdown-item" to="/createArticle">New Article</NavLink>
                        <a className="dropdown-item" href="#">Favourite Articles</a>
                        <div className="dropdown-divider" />
                        <NavLink className="dropdown-item" to={{ pathname: '/profile' }} exact>
                        Profile
                        </NavLink>
                        <a className="dropdown-item" href="#">Settings</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" id="signOutLink" href="" onClick={signOut}>Sign Out</a>
                      </div>
                    )
                    : null
                  }
                </div>
              )
              : (
                <div className={classes.bHeader}>
                  <button className={classes.button} onClick={clickSignin}>
            Sign In
                  </button>
                  <button className={classes.button} onClick={clickSignup}>
            Sign Up
                  </button>
                </div>
              )
      }
          </div>

          <nav className="navbar navbar-expand-lg pl-0 pr-0">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item pr-2">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item pr-2">
                  <NavLink className="nav-link" to="/articles">Articles</NavLink>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Sport
                  </a>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Cinema
                  </a>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Music
                  </a>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Politics
                  </a>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Science
                  </a>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Design
                  </a>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Literature
                  </a>
                </li>
                <li className="nav-item pr-2">
                  <a className="nav-link" href="/#">
                Astronomy
                  </a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
                <button className="btn btn-dark" type="submit">
              Search
                </button>
              </form>
            </div>
          </nav>
        </div>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  clickSignup: PropTypes.func,
  clickSignin: PropTypes.func,
  TOGGLE_PROFILE_ACTION: PropTypes.func,
  authStatus: PropTypes.bool,
  ProfileDropdownState: PropTypes.bool,
};

Header.defaultProps = {
  clickSignup: () => {},
  clickSignin: () => {},
  TOGGLE_PROFILE_ACTION: () => {},
  authStatus: false,
  ProfileDropdownState: true,
};

const mapStateToProps = state => {
  // map state to props
  return {
    authStatus: state.isAuthentic.isAuthentic,
    ProfileDropdownState: state.isAuthentic.toggleProfileDropdown,
  };
};

const mapDispatchToProps = dispatch => {
  // map dispatch to props
  return {
    // SIGNOUT: () => dispatch({ type: LOGIN_FAIL }),
    TOGGLE_PROFILE_ACTION: () => dispatch({ type: TOGGLE_PROFILE_DROPDOWN }),
    clickSignin: () => dispatch({ type: OPEN_MODAL_TO_LOGIN }),
    clickSignup: () => dispatch({ type: OPEN_MODAL_TO_REGISTRATION }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
