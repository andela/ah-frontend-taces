import reducer from '../../store/reducers/articleTextCommentReducer';
import {
  START_FETCHING_ARTICLE_TEXT_COMMENTS,
  FETCHING_ARTICLE_TEXT_COMMENTS_SUCCESS,
  FETCHING_ARTICLE_TEXT_COMMENTS_FAIL,
  START_POSTING_ARTICLE_TEXT_COMMENT,
  POSTING_ARTICLE_TEXT_COMMENT_SUCCESS,
  POSTING_ARTICLE_TEXT_COMMENT_FAIL,
} from '../../store/actions/actionTypes';

const initialState = {
  loading: false,
  textComments: [],
  error: '',
  postResponse: {},
};

describe('articleTextCommentReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change loading to true when fetching text comments starts', () => {
    const action = { type: START_FETCHING_ARTICLE_TEXT_COMMENTS };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(true);
  });

  it('should change loading to true when fetching text comments starts', () => {
    const action = { type: FETCHING_ARTICLE_TEXT_COMMENTS_SUCCESS, payload: [{}, {}] };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(false);
    expect(newState.textComments.length).toEqual(2);
  });

  it('should have an error message when fetching text comments fail', () => {
    const action = { type: FETCHING_ARTICLE_TEXT_COMMENTS_FAIL, payload: 'ERROR' };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(false);
    expect(newState.error).toEqual('ERROR');
  });

  it('should change loading to true when posting TEXT COMMENT starts', () => {
    const action = { type: START_POSTING_ARTICLE_TEXT_COMMENT };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(true);
  });

  it('should have a post response when posting is success', () => {
    const action = { type: POSTING_ARTICLE_TEXT_COMMENT_SUCCESS, payload: {} };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(false);
    expect(newState.postResponse).toEqual({});
  });

  it('should have a error response when posting fails', () => {
    const action = { type: POSTING_ARTICLE_TEXT_COMMENT_FAIL, payload: 'ERROR' };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(false);
    expect(newState.error).toEqual('ERROR');
  });
});
