import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from '../../CSS/Article.css';
import Wrapper from '../../hoc/Wrapper/Wrapper';

import ArticleLoader from '../Loaders/ArticleLoader';

import Header from '../Header/Header';
import Footer from '../../components/Foot/Foot';

export class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { tags: [] },
      author: {},
    };
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
            showLoader: true,
          });
        }
      })
      .catch();
  }

  render() {
    const { author, showLoader, data } = this.state;
    const { tags } = data;

    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
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

    return (
      <Wrapper>
        <div className="container">
          <Header />
          <div className="row">
            <div className="col-12">
              {!showLoader
                ? (<center><ArticleLoader /></center>)
                : (
                  <div>
                    <h5 className="text-center">Literature</h5>
                    <h1 className={`text-center ${classes.articleTitle}`}>
                      {data.title}
                    </h1>
                    <div className={`col-10 ${classes.content_enter}`}>
                      <span className={`col-12 p-0  float-left text-center ${classes.capitalise}`}>
                        {data.description}
                      </span>
                      <br />
                      <span className={`col-12 p-0 text-center float-left ${classes.capitalise}`}>
                        {author.username}
                        &nbsp;|&nbsp;
                        {new Date(data.created_at).toLocaleDateString('en-BR', options)}
                        &nbsp;|&nbsp;
                        2 Min read
                      </span>

                      <br />
                      <img src={data.image} alt="" className={`${classes.articleImage} ${classes.paragraph2}`} />
                    </div>
                    <div className={`col-10 text-justify ${classes.content_enter} ${classes.articleMetaData}`}>
                      <div dangerouslySetInnerHTML={{ __html: data.body }} />
                      <span className={`col-12 p-0 float-left ${classes.capitalise}`}>
                        <b>Tags: </b>
                        {tagList}
                      </span>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <Footer />
      </Wrapper>
    );
  }
}
Article.propTypes = {
  match: PropTypes.object,
};

Article.defaultProps = {
  match: {},
};

export default Article;
