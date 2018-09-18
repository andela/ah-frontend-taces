import React, { Component } from 'react';
import axios from 'axios';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import { Loader } from '../../components/Loader/Loader';
import SearchGriditem from '../../components/Search/SearchGridItem';
import classes from '../../CSS/SearchGrid.css';

export class SearchGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      loaderStatus: '',
      indicatorDisplay: '',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { context } = match.params;
    const { value } = match.params;
    this.retrievedData(context, value);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { context } = match.params;
    const { value } = match.params;
    this.retrievedData(context, value);
  }

  retrievedData = (context, value) => this.getArticles(context, value);

  getArticles = (context, value) => {
    const val = value.split(' ').join('-');
    this.showLoader();
    this.hideIndicator();
    return axios
      .get(`https://authors-haven-tabs.herokuapp.com/api/articles/search?${context}=${val}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
      .then(response => this.handleResponse('searchResults', response.data.results.articles))
      .catch(error => {
        if (error) {
          this.hideLoader();
          this.showIndicator();
        }
      });
  };

  handleResponse = (key, value) => {
    this.hideLoader();
    this.setState({
      [key]: value,
    });
    this.checkListsize();
  };

  showLoader = () => {
    this.setState({
      loaderStatus: 'block',
    });
  };

  hideLoader = () => {
    this.setState({
      loaderStatus: 'none',
    });
  };

  showIndicator = () => {
    this.setState({
      indicatorDisplay: 'block',
      searchResults: [],
    });
  };

  hideIndicator = () => {
    this.setState({
      indicatorDisplay: 'none',
    });
  };

  checkListsize = () => {
    const { searchResults } = this.state;
    if (searchResults.length === 0) {
      this.showIndicator();
    }
  };

  render() {
    const { searchResults, loaderStatus, indicatorDisplay } = this.state;
    return (
      <Wrapper>
        <div style={{ display: loaderStatus, textAlign: 'center' }}>
          <Loader />
        </div>
        <div className="container">
          <h3
            className={classes.searchGridIndicator}
            style={{ display: indicatorDisplay, textAlign: 'center' }}
          >
            There are no results for your search
          </h3>
          <div className={classes.container}>
            {searchResults.map(result => {
              return (
                <div key={result.slug}>
                  <SearchGriditem
                    slug={result.slug}
                    image={result.image}
                    title={result.title}
                    description={result.description}
                    author={result.author.username}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default SearchGrid;
