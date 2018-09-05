import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../CSS/Backdrop.css';

const backdrop = props => {
  const { show, clicked } = props;
  return show ? <div className={classes.Backdrop} onClick={clicked} /> : null;
};

backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func,
};

backdrop.defaultProps = {
  show: false,
  clicked: () => {},
};

export default backdrop;
