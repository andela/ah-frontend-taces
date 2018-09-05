import React from 'react';
import PropTypes from 'prop-types';
import classes from '../../CSS/Landing.css';

const landing = (props) => {
  const divClasses = [classes.Landing, 'col-sm-12'].join(' ');
  return (
    <div
      className={divClasses}
      style={{
        transform: !props.show ? 'translateX(-100vw)' : null,
      }}
      onClick={props.closeLanding}
    >
      <div className={classes.Headline}>
        <div className="col-sm-6">
          <h4>Author's Haven</h4>
          <span>
            The best thing about a book tour is meeting your imagined readers, staring into their
            lamplit faces, hearing a little about their lives and, for a slender moment anyway,
            feeling the reciprocity of your trade.
          </span>
        </div>
        <div className="col-sm-12">
          <button>READ ARTICLES</button>
          <button>SIGN IN </button>
        </div>
      </div>
    </div>
  );
};

landing.propTypes = {
  show: PropTypes.bool,
  closeLanding: PropTypes.func,
};

landing.defaultProps = {
  show: true,
  closeLanding: () => {},
};

export default landing;
