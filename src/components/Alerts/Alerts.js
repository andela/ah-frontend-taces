import React from 'react';
import PropTypes from 'prop-types';

export const Alerts = props => {
  const { alertType, title, message } = props;
  const classes = ['alert', alertType].join(' ');

  return (
    <div className={classes} role="alert">
      <center>
        <small>
          <strong>{title}</strong>
          {' '}
          {message}
        </small>
      </center>
    </div>
  );
};

Alerts.propTypes = {
  alertType: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

Alerts.defaultProps = {
  alertType: '',
  title: '',
  message: '',
};

export default Alerts;
