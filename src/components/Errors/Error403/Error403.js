import React from 'react';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import classes from '../../../CSS/Errors.css';
import { Home } from '../../../containers/Home/Home';

const Error403 = () => {
  return (
    <Wrapper>
      <div className={`container ${classes.padding_4_footer}`}>
        <div className={`col-md-8 text-center ${classes.content_enter}`}>
          <h2 className={`text-center ${classes.mainErrorText}`}>
            Oops!
            <br />
            Please login to access this content.
          </h2>
          <h6>WE NEED TO KNOW YOU!</h6>
          <NavLink className={`btn btn-dark ${classes.btn_color}`} to="/" exact component={Home}>BACK TO HOME</NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error403;
