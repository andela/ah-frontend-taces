import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classes from '../../CSS/Like.css';

class Bookmark extends Component {
  state = {
    isfavorited: true,
  };

  componentDidMount() {
    this.checkDefaultFavorite();
  }

  setTokenValue = () => {
    if (localStorage.getItem('token') === null) {
      return '';
    }
    return localStorage.getItem('token');
  }

  addBookmark = () => {
    const { articleSlug } = this.props;
    const token = this.setTokenValue();
    axios
      .post(`https://authors-haven-tabs.herokuapp.com/api/articles/${articleSlug}/favorite`, {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        this.setState({ isfavorited: true });
      });
  };

  removeBookmark = () => {
    const { articleSlug } = this.props;
    axios
      .delete(`https://authors-haven-tabs.herokuapp.com/api/articles/${articleSlug}/favorite`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        this.setState({
          isfavorited: false,
        });
      });
  };

  checkDefaultFavorite = () => {
    const { favorited } = this.props;
    if (favorited !== true) {
      return (this.setState({
        isfavorited: false,
      }), false);
    }
    return (this.setState({
      isfavorited: true,
    }), true);
  };

  toggleFavourite = () => {
    const { isfavorited } = this.state;
    if (isfavorited === false) {
      this.addBookmark();
    } else {
      this.removeBookmark();
    }
  };

  render() {
    const {
      isfavorited,
    } = this.state;
    return (
      <div className={classes.Like}>
        <div>
          <span>
            <i
            className={`fa fa-2x ${isfavorited === true ? 'fa-bookmark' : 'fa-bookmark-o'}`}
            style={{
              paddingLeft: '2px',
              paddingTop: '29px',
            }} onClick={() => this.toggleFavourite()} title="read later" />
          </span>
        </div>
      </div>
    );
  }
}

Bookmark.propTypes = {
  articleSlug: PropTypes.string,
  favorited: PropTypes.bool,
};

Bookmark.defaultProps = {
  articleSlug: '',
  favorited: false,
};

export default Bookmark;
