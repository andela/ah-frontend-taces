import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import provideScrollPosition from 'react-provide-scroll-position';
import StarRatingComponent from 'react-star-rating-component';
import readingTime from 'reading-time';
import classes from '../../../CSS/Article.css';
import Wrapper from '../../../hoc/Wrapper/Wrapper';

import CreateComment from '../../Comments/CreateComment';
import SharingArticleComponent from '../../../components/SocialMediaSharing/SharingArticle';
import ArticleLoader from '../../Loaders/ArticleLoader';
import Recent from '../../../components/Recent/Recent';

import Like from '../../Like/Like';
import { Error404 } from '../../../components/Errors/Error404/Error404';

export class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: {
        tags: [],
      },
      buttonStatus: 'block',
      buttonText: 'FOLLOW AUTHOR',
      numArticles: 0,
    };
    this.onStarClick = this.onStarClick.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.renderArticles(match.params.slug);
  }

  onStarClick(nextValue) {
    const { match } = this.props;
    axios({
      url: `https://authors-haven-tabs.herokuapp.com/api/articles/${match.params.slug}/rate/`,
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      data: {
        amount: nextValue,
      },
    }).then((response) => {
      this.setState({
        rating: response.data.rating.article.averageRating,
      });
    });
  }

  fetchArticle = slug => axios
    .get(`https://authors-haven-tabs.herokuapp.com/api/articles/search?slug=${slug}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    .then(response => response);

  renderArticles = slug => this.fetchArticle(slug).then(response => {
    const articlesArray = response.data.results;
    if (articlesArray.count > 0) {
      this.handleResponse('articleData', articlesArray.articles[0]);
      this.handleResponse('numArticles', articlesArray.count);
    } else {
      this.handleResponse('numArticles', articlesArray.count);
    }
  });

  handleResponse = (key, value) => {
    return this.setState(
      {
        [key]: value,
        showLoader: true,
      },
      this.hideButton,
    );
  };

  readTime = () => {
    const { articleData } = this.state;
    let timeMin = Math.floor(readingTime(`${articleData.body}`).minutes);
    if (timeMin <= 1) {
      timeMin = 1;
    }
    return timeMin;
  };

  followAuthor = () => {
    const { articleData } = this.state;
    axios
      .post(
        `https://authors-haven-tabs.herokuapp.com/api/users/${articleData.author.username}/follow/`,
        {},
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        },
      )
      .then(response => {
        this.setState({
          buttonText: 'FOLLOWING AUTHOR',
        });
        return response;
      }).catch(err => err);
  };

  hideButton = () => {
    const { articleData, numArticles } = this.state;
    const username = localStorage.getItem('username');
    if (numArticles > 0) {
      if (articleData.author.username === username) {
        this.setState({
          buttonStatus: 'none',
        });
      }
    }
  };

  render() {
    const {
      showLoader, articleData, buttonStatus, buttonText,
      numArticles,
    } = this.state;
    if (numArticles === 1 && showLoader) {
      const { scrollTop } = this.props;
      const { match } = this.props;

      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const tagList = articleData.tags.map((tag, index) => {
        return (
          <div className={classes.tag_grid} key={index}>
            <NavLink to={`/search/?tags&tag=${tag}`} className={classes.tag} key={index} href={tag}>
              {tag}
            </NavLink>
          </div>
        );
      });
      const { rating } = this.state;
      return (
        <Wrapper>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div>
                  <h5 className="text-center">Literature</h5>
                  <h1 className={`text-center ${classes.articleTitle}`}>{articleData.title}</h1>
                  <div className={scrollTop > 363 ? classes.sticky : classes.LikeSpan}>
                    <Like className={classes.LikeSpan} articleSlug={match.params.slug} />
                    <SharingArticleComponent
                        url={`https://authors-haven-front.herokuapp.com/articles/${
                          match.params.slug
                        }`}
                        title={articleData.title}
                      />
                  </div>

                  <div className={`col-10 ${classes.content_enter}`}>
                    <span
                        className={`col-12 text-center ${classes.capitalise} ${
                          classes.spanDesAuthor
                        }`}
                      >
                      {articleData.description}
                    </span>
                    <span
                        className={`col-12 text-center ${classes.capitalise} ${
                          classes.spanDesAuthor
                        }`}
                      >
                      {articleData.author.username}
                        &nbsp; | &nbsp;
                      {new Date(articleData.created_at).toLocaleDateString('en-BR', options)}
                        &nbsp; | &nbsp;
                      <span className={`${classes.spanDesAuthor} ${classes.lowercase}`}>
                        {this.readTime()}
                          &nbsp; min read
                      </span>
                    </span>
                    <br />
                    <img
                        src={articleData.image}
                        alt=""
                        className={`${classes.articleImage} ${classes.paragraph2}`}
                      />
                  </div>
                  <div
                      className={`col-10 text-justify ${classes.content_enter} ${
                        classes.articleMetaData
                      }`}
                    >
                    <div dangerouslySetInnerHTML={{ __html: articleData.body }} />
                    <span className={`col-12 p-0 float-left ${classes.capitalise}`}>
                      <b>Tags: </b>
                      {tagList}
                    </span>
                    <div>
                      <b>Average Rating: </b>
                      {rating}
                    </div>
                    <div>
                      <b>Rate this Article:</b>
                    </div>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        onStarClick={this.onStarClick}
                        renderStarIcon={() => (
                          <span>
                            <i className="fa fa-star-o" />
                          </span>
                        )}
                      />
                    <div>
                      <button
                          className="btn btn-outline-dark"
                          onClick={this.followAuthor}
                          style={{ display: buttonStatus }}
                        >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                  <Recent />
                  <CreateComment slug={match.params.slug} />
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      );
    }
    if (numArticles === 0 && showLoader) {
      return (
        <Error404 />
      );
    }
    return (
      <center>
        <ArticleLoader />
      </center>
    );
  }
}

ArticleDetail.propTypes = {
  match: PropTypes.object,
  scrollTop: PropTypes.number,
};

ArticleDetail.defaultProps = {
  match: {},
  scrollTop: 0,
};

export default provideScrollPosition(ArticleDetail);
