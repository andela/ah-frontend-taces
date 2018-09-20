import reducer from '../../store/reducers/articleDetailReducer';
import {
  SHOW_ARTICLE_TEXT_COMMENT_BOX, HIDE_ARTICLE_TEXT_COMMENT_BOX,
} from '../../store/actions/actionTypes';

const initialState = {
  showTextCommentBox: false,
};

describe('articleDetailReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change showTextBoxComment to true', () => {
    const action = { type: SHOW_ARTICLE_TEXT_COMMENT_BOX };
    const newState = reducer(initialState, action);
    expect(newState.showTextCommentBox).toEqual(true);
  });

  it('should change showTextBoxComment to false', () => {
    const action = { type: HIDE_ARTICLE_TEXT_COMMENT_BOX };
    const newState = reducer(initialState, action);
    expect(newState.showTextCommentBox).toEqual(false);
  });
});
