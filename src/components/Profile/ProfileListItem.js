import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from '../../CSS/ProfileListItem.css';

export class ProfileListItem extends Component {
  render() {
    const {
      image, title, description, likes,
    } = this.props;
    return (
      <div className={classes.listOuterContainer}>
        <div className={classes.imageContainer}>
          <img className={classes.listImage} src={image} alt="" />
        </div>
        <h3 className={classes.listTitle}>{title}</h3>
        <p className={classes.listDescription}>{description}</p>
        <div className={classes.listInnerContainer}>
          <div className={classes.listDivs}>
            <img
              className={classes.listIcons}
              src="https://image.flaticon.com/icons/svg/52/52137.svg"
              alt=""
            />
            <a
              className={classes.listLinks}
              href="https://image.flaticon.com/icons/svg/134/134680.svg"
            >
              <span className="listSpans">{likes}</span>
            </a>
          </div>
          <div className={classes.listDivs}>
            <img
              className={classes.listIcons}
              src="https://image.flaticon.com/icons/svg/134/134680.svg"
              alt=""
            />
            <a
              className={classes.listLinks}
              href="https://image.flaticon.com/icons/svg/134/134680.svg"
            >
              <span className={classes.listSpans}>1000</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
ProfileListItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};

export default ProfileListItem;
