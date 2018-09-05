import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../CSS/Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const modal = props => (
  <Wrapper>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
    <Backdrop show={props.show} clicked={props.closeModal} />
  </Wrapper>
);

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
