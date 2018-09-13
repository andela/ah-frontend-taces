import React, { Component } from 'react';
import axios from 'axios';
import NumericLabel from 'react-pretty-numbers';
import PropTypes from 'prop-types';
import classes from '../../CSS/Like.css';

class Like extends Component {
  state = {
    likesCount: 0,
    dislikesCount: 0,
    liked: false,
    disliked: false,
  };

  componentDidMount() {
    this.getLikesDislikes();
  }

  setTokenValue = () => {
    if (localStorage.getItem('token') === null) {
      return '';
    }
    return localStorage.getItem('token');
  }

  getLikesDislikes = () => {
    const { articleSlug } = this.props;
    const token = this.setTokenValue();
    axios
      .get(`https://authors-haven-tabs.herokuapp.com/api/articles/${articleSlug}/likes/dislikes/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(res => {
        const likedBefore = res.data.everLiked;
        const dislikedBefore = res.data.everdisLiked;
        const likesNum = res.data.likes;
        const dislikesNum = res.data.dislikes;
        this.setState({
          likesCount: likesNum,
          dislikesCount: dislikesNum,
          liked: likedBefore,
          disliked: dislikedBefore,
        });
      });
  };

  onLikeHandler = () => {
    const { articleSlug } = this.props;
    axios
      .post(`https://authors-haven-tabs.herokuapp.com/api/articles/${articleSlug}/like`, {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        this.getLikesDislikes();
      });
  };

  ondisLikeHandler = () => {
    const { articleSlug } = this.props;
    axios
      .post(`https://authors-haven-tabs.herokuapp.com/api/articles/${articleSlug}/dislike`, {}, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        this.getLikesDislikes();
      });
  };

  render() {
    const {
      likesCount, dislikesCount, liked, disliked,
    } = this.state;
    return (
      <div className={classes.Like}>
        <div>
          <span>
            <i
              className="fa fa-lg fa-thumbs-up"
              style={{
                color: liked ? 'blue' : 'black',
              }} onClick={() => this.onLikeHandler()} />
            <NumericLabel style={{ marginTop: '-4px' }} params={{ shortFormat: true }}>
              {likesCount}
            </NumericLabel>
          </span>
          <span>
            <i
            className="fa fa-lg fa-thumbs-down"
            style={{
              color: disliked ? 'blue' : 'black',
            }} onClick={() => this.ondisLikeHandler()} />
            <NumericLabel style={{ marginTop: '-4px' }} params={{ shortFormat: true }}>
              {dislikesCount}
            </NumericLabel>
          </span>
        </div>
      </div>
    );
  }
}

Like.propTypes = {
  articleSlug: PropTypes.string,
};

Like.defaultProps = {
  articleSlug: '',
};

export default Like;
