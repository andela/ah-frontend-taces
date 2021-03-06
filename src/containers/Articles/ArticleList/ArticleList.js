import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import ArticleLoader from '../../Loaders/ArticleLoader';
import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { LOAD_MORE_ARTICLES } from '../../../store/actions/actionTypes';
import { fetchArticles } from '../../../store/actions/articleListActions';
import classes from '../../../CSS/index.css';

export class ArticleList extends Component {
  componentDidMount() {
    this.LoadMoreArticles();
  }

  LoadMoreArticles = () => {
    const {
      onLoadMoreArticles, page, items, onFetchArticles,
    } = this.props;
    onLoadMoreArticles();
    onFetchArticles(page, items);
  };

  render() {
    const { articles, hasMore, items } = this.props;

    return (
      <div className={classes.allArticlesContainer}>
        <h5>RECENT STORIES</h5>
        <InfiniteScroll
          dataLength={items.length}
          pageStart={0}
          next={this.LoadMoreArticles}
          hasMore={hasMore}
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

const mapStateToProps = state => {
  return {
    articles: state.articleList.articles,
    page: state.articleList.page,
    items: state.articleList.items,
    hasMore: state.articleList.hasMore,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadMoreArticles: () => dispatch({ type: LOAD_MORE_ARTICLES }),
    onFetchArticles: (page, item) => dispatch(fetchArticles(page, item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleList);
