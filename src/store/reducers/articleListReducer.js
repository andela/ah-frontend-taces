import {
  LOAD_MORE_ARTICLES, START_FETCH_ARTICLES_FIRST_PAGE,
  END_LOADING_ARTICLES,
} from '../actions/actionTypes';

const initialState = {
  items: Array.from({ length: 5 }),
  articles: [],
  page: 1,
  hasMore: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCH_ARTICLES_FIRST_PAGE:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
      };
    case LOAD_MORE_ARTICLES:
      return {
        ...state,
        page: state.page + 1,
        items: state.items.concat(Array.from({
          length: 5,
        })),
      };
    case END_LOADING_ARTICLES:
      return {
        ...state,
        hasMore: false,
      };
    default:
      break;
  }
  return state;
};

export default reducer;
