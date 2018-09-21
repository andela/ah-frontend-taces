import axios from 'axios';
import {
  LOAD_MORE_ARTICLES,
  START_FETCH_ARTICLES_FIRST_PAGE,
  END_LOADING_ARTICLES,
} from './actionTypes';

export const startfetchArticles = (articles) => {
  return {
    type: START_FETCH_ARTICLES_FIRST_PAGE,
    payload: articles,
  };
};

export const loadmoreArticles = () => {
  return {
    type: LOAD_MORE_ARTICLES,
  };
};


export const endFetchArticles = () => {
  return {
    type: END_LOADING_ARTICLES,
  };
};

export const loadMoreArticles = (articles) => {
  return dispatch => {
    dispatch(loadmoreArticles());
    dispatch(startfetchArticles(articles));
  };
};

export const fetchArticles = (page, items) => {
  const apiLink = `https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=${page}`;
  return dispatch => {
    return axios
      .get(
        apiLink, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      )
      .then(res => {
        if (items.length + 1 <= res.data.results.count) {
          dispatch(startfetchArticles(res.data.results.articles));
        } else {
          dispatch(endFetchArticles());
        }
      })
      .catch(error => {
        dispatch(endFetchArticles(error.response.data.errors));
      });
  };
};
