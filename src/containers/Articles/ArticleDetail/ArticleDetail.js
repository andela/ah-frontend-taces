import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import readingTime from 'reading-time';
import Popover from 'react-popover';
import classes from '../../../CSS/Article.css';
import Wrapper from '../../../hoc/Wrapper/Wrapper';

import CreateComment from '../../Comments/CreateComment';
import SharingArticleComponent from '../../../components/SocialMediaSharing/SharingArticle';
import ArticleLoader from '../../Loaders/ArticleLoader';
import Recent from '../../../components/Recent/Recent';
import Like from '../../Like/Like';
import Bookmark from '../../../components/Bookmark/Bookmark';
import TextComment from '../TextComment/TextComment';
import {
  SHOW_ARTICLE_TEXT_COMMENT_BOX,
  HIDE_ARTICLE_TEXT_COMMENT_BOX,
  OPEN_OVERLAY,
  CLOSE_OVERLAY,
} from '../../../store/actions/actionTypes';
import { Error404 } from '../../../components/Errors/Error404/Error404';
import ReportArticleComponent from '../../../components/Overlays/ReportArticleOverlay';

export class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: {
        tags: [],
      },
      buttonStatus: 'block',
      buttonText: 'FOLLOW AUTHOR',
      selectedText: '',
      numArticles: 0,
      popoverIsOpen: false,
      showLoader: false,
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
    }).then(response => {
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
      this.handleResponse('showLoader', true);
    } else {
      this.handleResponse('numArticles', articlesArray.count);
      this.handleResponse('numArticles', false);
    }
  });

  handleResponse = (key, value) => {
    return this.setState(
      {
        [key]: value,
      },
      this.hideButton(),
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
      })
      .catch(err => err);
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

  selectText = event => {
    event.stopPropagation();
    const { toggleOnTextCommentBox, toggleOffTextCommentBox } = this.props;
    if (window.getSelection().toString().length > 500 && toggleOnTextCommentBox) {
      toggleOffTextCommentBox();
    }

    if (
      window.getSelection().toString().length >= 2
      && window.getSelection().toString().length <= 500
    ) {
      const selectedText = window.getSelection().toString();
      this.setState({ selectedText });
      toggleOnTextCommentBox();
    }
  };

  handleReportClick = () => {
    const { OPEN_REPORT_OVERLAY } = this.props;
    OPEN_REPORT_OVERLAY();
  };

  togglePopover = ({ toState }) => {
    const { popoverIsOpen } = this.state;
    const popoverIs = typeof toState === 'boolean' ? toState : !popoverIsOpen;
    this.setState({
      popoverIsOpen: popoverIs,
    });
  };

  render() {
    const {
      showLoader,
      articleData,
      buttonStatus,
      buttonText,
      numArticles,
      popoverIsOpen,
    } = this.state;
    if (numArticles === 1 && showLoader) {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const {
        scrollTop, match, openOverlay, CLOSE_REPORT_OVERLAY,
      } = this.props;

      const tagList = articleData.tags.map((tag, index) => {
        return (
          <div className={classes.tag_grid} key={index}>
            <NavLink to={`/search/tag/${tag}`} className={classes.tag} key={index}>
              {tag}
            </NavLink>
          </div>
        );
      });
      const { rating, selectedText } = this.state;
      const { showTextCommentBox, toggleOffTextCommentBox } = this.props;

      const popoverProps = {
        isOpen: popoverIsOpen,
        preferPlace: null,
        place: null,
        onOuterAction: () => this.togglePopover(false),
        body: [
          <div key="b" className={classes.reportButtonContainer}>
            <button onClick={this.handleReportClick} className={classes.reportButton}>
              Report this article
            </button>
          </div>,
        ],
      };

      return (
        <Wrapper>
          <ReportArticleComponent display={openOverlay} closeOverlay={CLOSE_REPORT_OVERLAY} />
          <div className="container">
            <div className="row">
              <div className="col-12">
                {!showLoader ? (
                  <center>
                    <ArticleLoader />
                  </center>
                ) : (
                  <div>
                    <h5 className="text-center">Literature</h5>
                    <h1 className={`text-center ${classes.articleTitle}`}>{articleData.title}</h1>
                    <div
                      className={
                        showTextCommentBox
                          ? classes.TextCommentSpan
                          : classes.TextCommentSpanShowNone
                      }
                    >
                      <TextComment articleSlug={match.params.slug} selected={selectedText} />
                    </div>
                    <div className={scrollTop > 363 ? classes.sticky : classes.LikeSpan}>
                      <Like className={classes.LikeSpan} articleSlug={match.params.slug} />
                      <SharingArticleComponent
                        url={`https://authors-haven-front.herokuapp.com/articles/${
                          match.params.slug
                        }`}
                        title={articleData.title}
                      />
                      <Bookmark
                        className={classes.LikeSpan}
                        favorited={articleData.favorited}
                        authorUsername={articleData.author.username}
                        articleImage={articleData.image}
                        articleTitle={articleData.title}
                        articleSlug={match.params.slug} />
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
                        &nbsp; | &nbsp;
                        <span className={`${classes.spanDesAuthor}`}>
                          <span className="fa fa-eye" />
                          &nbsp;
                          {articleData.viewsCount}
                          &nbsp; views
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
                      <div
                        onDoubleClick={event => {
                          event.stopPropagation();
                          toggleOffTextCommentBox();
                        }}
                      >
                        <div
                          onMouseUp={event => this.selectText(event)}
                          dangerouslySetInnerHTML={{ __html: articleData.body }}
                        />
                        <span className={`col-12 p-0 float-left ${classes.capitalise}`}>
                          <b>Tags:&nbsp; </b>
                          {tagList}
                        </span>
                        <div />
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
                      <div>
                        <Popover {...popoverProps} className={classes.myPopOver}>
                          <button onClick={this.togglePopover} className={classes.moreButton}>
                            <i className="fas fa-ellipsis-h" />
                          </button>
                        </Popover>
                      </div>
                    </div>
                    <Recent />
                    <CreateComment slug={match.params.slug} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Wrapper>
      );
    }
    if (numArticles === 0 && showLoader === false) {
      return (
        <center>
          <ArticleLoader />
        </center>
      );
    }
    return (
      <Error404 />
    );
  }
}

ArticleDetail.propTypes = {
  match: PropTypes.object,
  scrollTop: PropTypes.number,
  showTextCommentBox: PropTypes.bool,
  toggleOnTextCommentBox: PropTypes.func,
  toggleOffTextCommentBox: PropTypes.func,
};

ArticleDetail.defaultProps = {
  match: {},
  scrollTop: 0,
  showTextCommentBox: false,
  toggleOnTextCommentBox: () => {},
  toggleOffTextCommentBox: () => {},
};

const mapStateToProps = state => {
  return {
    showTextCommentBox: state.articleDetail.showTextCommentBox,
    openOverlay: state.overlayReducer.openOverlay,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleOnTextCommentBox: () => dispatch({ type: SHOW_ARTICLE_TEXT_COMMENT_BOX }),
    toggleOffTextCommentBox: () => dispatch({ type: HIDE_ARTICLE_TEXT_COMMENT_BOX }),
    OPEN_REPORT_OVERLAY: () => dispatch({ type: OPEN_OVERLAY }),
    CLOSE_REPORT_OVERLAY: () => dispatch({ type: CLOSE_OVERLAY }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetail);
