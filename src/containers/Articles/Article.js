import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import provideScrollPosition from 'react-provide-scroll-position';
import StarRatingComponent from 'react-star-rating-component';
import classes from '../../CSS/Article.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

import CreateComment from '../Comments/CreateComment';
import SharingArticleComponent from '../../components/SocialMediaSharing/SharingArticle';
import ArticleLoader from '../Loaders/ArticleLoader';
import RelatedArticles from '../../components/relatedArticles/relatedArticles';

import Like from '../Like/Like';

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { tags: [] },
      author: {},
    };
    this.onStarClick = this.onStarClick.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    axios
      .get(
        `https://authors-haven-tabs.herokuapp.com/api/articles/search?slug=${match.params.slug}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      )
      .then(response => {
        if (response.data.results.count > 0) {
          this.setState({
            data: response.data.results.articles[0],
            author: response.data.results.articles[0].author,
            slug: response.data.results.articles[0].slug,
            rating: response.data.results.articles[0].rating,
            showLoader: true,
          });
        }
      })
      .catch();
  }

  onStarClick(nextValue) {
    const { slug } = this.state;
    axios({
      url: `https://authors-haven-tabs.herokuapp.com/api/articles/${slug}/rate/`,
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

  render() {
    const {
      author, showLoader, data, slug,
    } = this.state;
    const { scrollTop } = this.props;
    const { tags } = data;
    const { match } = this.props;

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const tagList = tags.map((tag, index) => {
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
              {!showLoader ? (
                <center>
                  <ArticleLoader />
                </center>
              ) : (
                <div>
                  <h5 className="text-center">Literature</h5>
                  <center>
                    <h1 className={`text-center ${classes.articleTitle}`}>{data.title}</h1>
                  </center>
                  <div className={scrollTop > 363 ? classes.sticky : classes.LikeSpan}>
                    <Like className={classes.LikeSpan} articleSlug={slug} />
                    <SharingArticleComponent
                      url={`https://authors-haven-front.herokuapp.com/articles/${
                        match.params.slug
                      }`}
                      title={data.title}
                    />
                  </div>

                  <div className={`col-10 ${classes.content_enter}`}>
                    <span
                      className={`col-12 text-center ${classes.capitalise} ${
                        classes.spanDesAuthor
                      }`}
                    >
                      {data.description}
                    </span>
                    <span
                      className={`col-12 text-center ${classes.capitalise} ${
                        classes.spanDesAuthor
                      }`}
                    >
                      {author.username}
                      &nbsp;|&nbsp;
                      {new Date(data.created_at).toLocaleDateString('en-BR', options)}
                      &nbsp;|&nbsp; 2 Min read
                    </span>
                    <br />
                    <img
                      src={data.image}
                      alt=""
                      className={`${classes.articleImage} ${classes.paragraph2}`}
                    />
                  </div>
                  <div
                    className={`col-10 text-justify ${classes.content_enter} ${
                      classes.articleMetaData
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: data.body }} />
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
                  </div>
                  <RelatedArticles />
                  <CreateComment slug={match.params.slug} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
Article.propTypes = {
  match: PropTypes.object,
  scrollTop: PropTypes.number,
};

Article.defaultProps = {
  match: {},
  scrollTop: 0,
};

export default provideScrollPosition(Article);
