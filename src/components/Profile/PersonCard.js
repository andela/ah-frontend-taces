import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from '../../CSS/PersonCard.css';
import { generatePhotoLink } from '../../assets/utils/ImageCropper';

export class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Following',
      username: props.username,
      image: props.image,
    };
  }

  changeButtonText = () => {
    this.setState({
      buttonText: 'Unfollow',
    });
  };

  resetButtonText = () => {
    this.setState({
      buttonText: 'Following',
    });
  };

  onFocus = () => {};

  unfollowUser = () => {
    const { username } = this.state;
    axios
      .delete(`https://authors-haven-tabs.herokuapp.com/api/users/${username}/unfollow/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
      .then(() => {
        const { updateGrid } = this.props;
        updateGrid(username);
      });
  };

  getUserImage = () => {
    const { image } = this.state;
    if (image) {
      return generatePhotoLink(image);
    }
    return localStorage.getItem('picture');
  };

  render() {
    const { buttonText, username } = this.state;
    return (
      <Wrapper>
        <div className={`card ${classes.cardDim}`}>
          <div className="card-body">
            <div className={classes.userImgContainer}>
              <img
                className={classes.profileImg}
                src={this.getUserImage()}
                alt=""
              />
            </div>
            <h3 className={classes.usernameStyling}>{username}</h3>
            <div className={classes.followBtnDivStyling}>
              <button
                className="btn btn-outline-dark"
                onMouseOver={this.changeButtonText}
                onMouseLeave={this.resetButtonText}
                onFocus={this.onFocus}
                onClick={this.unfollowUser}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
PersonCard.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PersonCard;
