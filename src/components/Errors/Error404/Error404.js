import React from 'react';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../../hoc/Wrapper/Wrapper';
import classes from '../../../CSS/Errors.css';
import { Home } from '../../../containers/Home/Home';

export const Error404 = () => {
  return (
    <Wrapper>
      <div className={`container ${classes.padding_4_footer}`}>
        <div className={`col-md-8 text-center ${classes.content_enter}`}>
          <h2 className={`text-center ${classes.mainErrorText}`}>
            Oops!
            <br />
            Page not found
          </h2>
          <h6>YOU ARE GETTING LOST!</h6>
          <NavLink className={`btn btn-dark ${classes.btn_color}`} to="/" exact component={Home}>BACK TO HOME</NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default Error404;
