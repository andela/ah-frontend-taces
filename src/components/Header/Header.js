import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../CSS/Header.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const header = props => {
  const topHeaderDivClasses = ['d-flex align-items-center', classes.topheader].join(' ');
  const { clickSignin, clickSignup } = props;
  return (
    <Wrapper>
      <div className={topHeaderDivClasses}>
        <h1 className="mx-auto pl-2">
          {''}
          Author&apos;s Haven
          {''}
        </h1>
        <div className={classes.bHeader}>
          <button className={classes.button} onClick={clickSignin}>
            Sign In
          </button>
          <button className={classes.button} onClick={clickSignup}>
            Sign Up
          </button>
        </div>
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
              <a className="nav-link" href="">
                Home
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Culture
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Sport
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Cinema
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Music
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Politics
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Science
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Design
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
                Literature
              </a>
            </li>
            <li className="nav-item pr-2">
              <a className="nav-link" href="">
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
    </Wrapper>
  );
};

header.propTypes = {
  clickSignup: PropTypes.func,
  clickSignin: PropTypes.func,
};

header.defaultProps = {
  clickSignup: () => {},
  clickSignin: () => {},
};

export default header;
