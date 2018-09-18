import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from '../../CSS/SearchGridItem.css';

export class SearchGridItem extends Component {
  render() {
    const {
      title, description, slug, author,
    } = this.props;
    let { image } = this.props;
    if (image == null || image === '') {
      image = 'http://res.cloudinary.com/ronzalo777/image/upload/v1537184865/pov5uovdstk7ovjouxhk.png';
    }
    return (
      <div className={classes.listOuterContainer}>
        <div className={classes.imageContainer}>
          <img
            className={classes.listImage}
            src={image}
            alt=""
          />
        </div>
        <NavLink to={`/articles/${slug}`}>
          <h3 className={classes.listTitle}>{title}</h3>
        </NavLink>
        <p className={classes.listDescription}>{description}</p>
        <span className={classes.listSpans}>{author}</span>
      </div>
    );
  }
}
SearchGridItem.propTypes = {
  slug: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default SearchGridItem;
