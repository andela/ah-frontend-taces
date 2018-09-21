import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import ArticleListItem from '../Articles/ArticleListItem/ArticleListItem';
import classes from '../../CSS/index.css';
import ArticleLoader from '../Loaders/ArticleLoader';

export class Bookmarks extends Component {
  state = {
    articles: [],
    items: Array.from({ length: 5 }),
    hasContent: true,
    page: 1,
  }

  componentDidMount() {
    const { page } = this.state;
    this.renderBookmarks(page);
  }

  fetchbookmarks = () => {
    const { page } = this.state;
    return (
      axios
        .get(`https://authors-haven-tabs.herokuapp.com/api/articles/search?favorite&page=${page}`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        })
        .then(response => response)
        .catch(() => this.handleResponse('hasContent', false))
    );
  }

  handleResponse = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  renderBookmarks = () => this.fetchbookmarks()
    .then(response => {
      if (response && response.data.results.count > 0) {
        return (
          this.handleResponse('articles', response.data.results.articles),
          this.handleResponse('hasContent', true),
          this.handleResponse('totalItems', response.data.results.count)
        );
      }
      return (
        this.handleResponse('hasContent', false)
      );
    })

  loadMoreBookmarks = () => {
    const { totalItems, items } = this.state;
    if (items.length + 5 <= totalItems) {
      this.setState(prevState => ({
        page: prevState.page + 1,
        hasContent: true,
      }), this.renderBookmarks);
    } else {
      this.setState({
        hasContent: false,
      });
    }
  }

  render() {
    const {
      articles, hasContent, items,
    } = this.state;
    return (
      <div className={classes.allArticlesContainer}>
        <h5>BOOKMARKED ARTICLES</h5>
        <InfiniteScroll
          dataLength={items.length}
          pageStart={0}
          next={this.loadMoreBookmarks}
          hasMore={hasContent}
          loader={<ArticleLoader />}
          endMessage={(
            <p style={{ textAlign: 'center' }}>
              <b>THE VERY END! NO MORE ARTICLES</b>
            </p>
          )}
        >
          <div className={classes.recentArticlesContainer}>
            {articles.map((article, index) => (
              <ArticleListItem {...article} key={index} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
export default Bookmarks;
