import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../CSS/Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const modal = props => {
  const { show, closeModal, children } = props;
  return (
    <Wrapper>
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
      <Backdrop show={show} clicked={closeModal} />
    </Wrapper>
  );
};

modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  closeModal: PropTypes.func,
};

modal.defaultProps = {
  show: false,
  closeModal: () => {},
};

export default modal;
