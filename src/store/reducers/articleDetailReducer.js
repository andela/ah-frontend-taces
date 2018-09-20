import {
  SHOW_ARTICLE_TEXT_COMMENT_BOX, HIDE_ARTICLE_TEXT_COMMENT_BOX,
} from '../actions/actionTypes';

const initialState = {
  showTextCommentBox: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ARTICLE_TEXT_COMMENT_BOX:
      return {
        ...state,
        showTextCommentBox: true,
      };
    case HIDE_ARTICLE_TEXT_COMMENT_BOX:
      return {
        ...state,
        showTextCommentBox: false,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
