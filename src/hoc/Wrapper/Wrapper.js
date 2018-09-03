import React from 'react';
import propTypes from 'prop-types';

const wrapper = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

wrapper.propTypes = {
  children: propTypes.func.isRequired,
};

export default wrapper;
