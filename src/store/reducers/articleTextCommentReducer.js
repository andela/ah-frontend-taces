import {
  START_FETCHING_ARTICLE_TEXT_COMMENTS, FETCHING_ARTICLE_TEXT_COMMENTS_SUCCESS,
  FETCHING_ARTICLE_TEXT_COMMENTS_FAIL, START_POSTING_ARTICLE_TEXT_COMMENT,
  POSTING_ARTICLE_TEXT_COMMENT_SUCCESS, POSTING_ARTICLE_TEXT_COMMENT_FAIL,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  textComments: [],
  error: '',
  postResponse: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_ARTICLE_TEXT_COMMENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCHING_ARTICLE_TEXT_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        textComments: [...action.payload],
      };
    case FETCHING_ARTICLE_TEXT_COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case START_POSTING_ARTICLE_TEXT_COMMENT:
      return {
        ...state,
        loading: true,
      };
    case POSTING_ARTICLE_TEXT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        postResponse: { ...action.payload },
      };
    case POSTING_ARTICLE_TEXT_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
