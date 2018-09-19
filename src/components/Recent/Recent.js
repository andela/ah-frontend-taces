import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from '../../CSS/index.css';

class recent extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    this.fetchArtciles();
  }

  fetchArtciles = () => axios
    .get('https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=1')
    .then(response => this.handleResponse(response.data.results.articles));

  handleResponse = articles => this.setState({ articles });

  render() {
    const { articles } = this.state;

    // to be used to set a readable date format
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return (
      <Wrapper>
        <h4>RECENT STORIES</h4>
        <div className={classes.recentArticlesContainer}>
          {articles.map((article, index) => (
            <div key={index} className={classes.recentArticleDiv}>
              <NavLink to={`articles/${article.slug}`}>
                <img src={article.image === null ? 'http://res.cloudinary.com/ronzalo777/image/upload/v1537184865/pov5uovdstk7ovjouxhk.png' : article.image} alt="" className={classes.articleImg} />
                <h5>{article.title}</h5>
                <p className={classes.titleParagraph}>{article.description}</p>
              </NavLink>
              <p className={classes.authorTag}>
                Author:
                {`  ${article.author.username}  `}
                {new Date(article.created_at).toLocaleDateString('en-BR', options)}
              </p>
            </div>
          ))}
          <div className={classes.recentArticleDiv}>
            <NavLink to="/articles">
              <button className={classes.viewMoreButton}>{(articles.length === 0) ? 'There are no articles' : 'View more Articles' }</button>
            </NavLink>
          </div>
        </div>
        <hr style={{ width: '100%' }} />
      </Wrapper>
    );
  }
}

export default recent;
