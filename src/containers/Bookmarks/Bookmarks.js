import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ArticleListItem from '../Articles/ArticleListItem/ArticleListItem';
import classes from '../../CSS/Errors.css';
import { Home } from '../Home/Home';

export class Bookmarks extends Component {
  state = {
    articles: [],
  }

  componentDidMount() {
    this.hasBookmark();
  }

  hasBookmark = () => {
    if (localStorage.getItem('bookmarks') === null) {
      this.setState({
        hasContent: false,
      });
    } else {
      const bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
      const userEmail = localStorage.getItem('email');
      const hasBookmarked = Object.keys(bookmarkArray).some((key) => {
        return bookmarkArray[key].user === userEmail;
      });
      if (hasBookmarked === true) {
        this.listBookmarkedArticles(userEmail, bookmarkArray);
      }
    }
  }

  listBookmarkedArticles = (user, bookmarkArray) => {
    const userBookmarks = bookmarkArray.filter((bookmarkObj) => {
      return (bookmarkObj.user === user);
    });
    this.setState({
      articles: [...userBookmarks],
      hasContent: true,
    });
  }

  render() {
    const {
      articles, hasContent,
    } = this.state;
    return (
      <div className="container">
        <h5>BOOKMARKED ARTICLES</h5>
        <div className="row">
          {
            hasContent === true
              ? articles.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <ArticleListItem {...article} />
                </div>
              ))
              : (
                <div className="col-12">
                  <div className={`container ${classes.padding_4_footer}`}>
                    <div className={`col-md-8 text-center ${classes.content_enter}`}>
                      <h4 className="text-center">
                        Oops!
                        <br />
                        You have not bookmarked anything!
                      </h4>
                      <NavLink
                        className={`btn btn-dark ${classes.btn_color}`}
                        to="/"
                        exact component={Home}>
                        BACK TO HOME
                      </NavLink>
                    </div>
                  </div>
                </div>)
          }
        </div>
      </div>
    );
  }
}
export default Bookmarks;
