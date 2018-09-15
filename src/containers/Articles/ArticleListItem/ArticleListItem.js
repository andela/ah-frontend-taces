import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../../../CSS/index.css';

const article = (props) => {
  const { ...prop } = props;
  const { image } = props;
  let pic = image;
  if (pic === null) {
    pic = 'http://res.cloudinary.com/ronzalo777/image/upload/v1537184865/pov5uovdstk7ovjouxhk.png';
  }
  return (
    <div className={`${classes.articleDiv}`}>
      <div className={classes.imgWrapper}>
        <img
          src={pic}
          alt={prop.slug}
          className={classes.articleImg}
        />
      </div>
      <NavLink
        to={`articles/${prop.slug}`}>
        <h5>{prop.title}</h5>
      </NavLink>
      <p className={classes.titleParagraph}>
        {prop.description}
        <NavLink to={
          `articles/${prop.slug}`
        }>
        read more
          {' '}

        </NavLink>
      </p>
      <p className={classes.authorTag}>Author: Riz Ahmed Jan 1st, 2018</p>
    </div>
  );
};
export default article;
