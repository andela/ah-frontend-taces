import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import _ from 'underscore';
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
        this.manageBookmarkLocalStorage();
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
        this.manageBookmarkLocalStorage();
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

  manageBookmarkLocalStorage = () => {
    const { articleSlug } = this.props;
    const email = localStorage.getItem('email');
    const currentSlug = articleSlug.toString();
    const uniqueId = email + currentSlug;
    const bookmarkObj = {
      slug: currentSlug,
      user: email,
      objectId: uniqueId,
    };

    if (localStorage.getItem('bookmarks') === null) {
      const bookmarks = [];
      bookmarks.push(bookmarkObj);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      const me = Object.keys(bookmarks).some((key) => {
        return bookmarks[key].objectId === uniqueId;
      });
      const slugIndex = _.findIndex(bookmarks, { objectId: uniqueId });
      if (!me === true && slugIndex < 0) {
        bookmarks.push(bookmarkObj);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      } else {
        bookmarks.splice(slugIndex, 1);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
    }
  }


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
