import axios from 'axios';
import {
  START_FETCHING_ARTICLE_TEXT_COMMENTS,
  FETCHING_ARTICLE_TEXT_COMMENTS_SUCCESS,
  FETCHING_ARTICLE_TEXT_COMMENTS_FAIL,
  START_POSTING_ARTICLE_TEXT_COMMENT,
  POSTING_ARTICLE_TEXT_COMMENT_SUCCESS,
  POSTING_ARTICLE_TEXT_COMMENT_FAIL,
} from './actionTypes';

// FETCHING ARTICLE TEXT COMMENTS
export const startFetchingTextComments = () => {
  return {
    type: START_FETCHING_ARTICLE_TEXT_COMMENTS,
  };
};

export const fetchTextCommentsSuccess = (results) => {
  return {
    type: FETCHING_ARTICLE_TEXT_COMMENTS_SUCCESS,
    payload: results,
  };
};

export const fetchTextCommentsFail = (message) => {
  return {
    type: FETCHING_ARTICLE_TEXT_COMMENTS_FAIL,
    payload: message,
  };
};

export const fetchTextComments = (articleSlug) => {
  return dispatch => {
    dispatch(startFetchingTextComments());
    return axios
      .get(`https://authors-haven-tabs.herokuapp.com/api/articles/${articleSlug}/all/text-comments/`)
      .then(response => {
        dispatch(fetchTextCommentsSuccess(response.data.results));
      })
      .catch(error => {
        dispatch(fetchTextCommentsFail(error.message));
      });
  };
};

// POSTING ARTICLE TEXT COMMENT

export const startPostingTextComment = () => {
  return {
    type: START_POSTING_ARTICLE_TEXT_COMMENT,
  };
};

export const postingTextCommentSuccess = (responseData) => {
  return {
    type: POSTING_ARTICLE_TEXT_COMMENT_SUCCESS,
    payload: responseData,
  };
};

export const postingTextCommentFail = (errorMessage) => {
  return {
    type: POSTING_ARTICLE_TEXT_COMMENT_FAIL,
    payload: errorMessage,
  };
};

export const postTextComment = (articleSlug, data) => {
  return dispatch => {
    dispatch(startPostingTextComment());
    return axios
      .post(`https://authors-haven-tabs.herokuapp.com/api/articles/${articleSlug}/text-comment/`,
        data, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        })
      .then(response => {
        dispatch(postingTextCommentSuccess(response.data));
      })
      .catch(error => {
        dispatch(postingTextCommentFail(error.message));
      });
  };
};
