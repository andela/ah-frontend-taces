import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from '../../CSS/PersonCard.css';
import { generatePhotoLink } from '../../assets/utils/ImageCropper';

export class FollowerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      image: props.image,
      buttonText: 'Follower',
    };
  }

  changeButtonText = () => {
    this.setState({
      buttonText: 'Follow',
    });
  };

  resetButtonText = () => {
    this.setState({
      buttonText: 'Follower',
    });
  };

  onFocus = () => {};

  followUser = () => {
    const { username } = this.state;
    axios
      .post(
        `https://authors-haven-tabs.herokuapp.com/api/users/${username}/follow/`,
        {},
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        },
      )
      .then(response => response)
      .catch(err => err);
  };

  getUserImage = () => {
    const { image } = this.state;
    if (image) {
      return generatePhotoLink(image);
    }
    return localStorage.getItem('picture');
  };

  render() {
    const { username, buttonText } = this.state;
    return (
      <Wrapper>
        <div className={`card ${classes.cardDim}`}>
          <div className="card-body">
            <div className={classes.userImgContainer}>
              <img className={classes.profileImg} src={this.getUserImage()} alt="" />
            </div>
            <h3 className={classes.usernameStyling}>{username}</h3>
            <div className={classes.followBtnDivStyling}>
              <button
                className="btn btn-outline-dark"
                onMouseOver={this.changeButtonText}
                onMouseLeave={this.resetButtonText}
                onFocus={this.onFocus}
                onClick={this.followUser}
              >
                {buttonText}
              </button>
            </div>
            <div className={classes.followBtnDivStyling}>
              <a href="#">Check Profile</a>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
FollowerCard.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FollowerCard;
