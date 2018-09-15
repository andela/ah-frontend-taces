import fetchArticles from '../../store/reducers/articleListReducer';
import {
  LOAD_MORE_ARTICLES,
  START_FETCH_ARTICLES_FIRST_PAGE,
  END_LOADING_ARTICLES,
} from '../../store/actions/actionTypes';

const initialState = {
  items: Array.from({ length: 5 }),
  articles: [],
  page: 1,
  hasMore: true,
};

describe('registerReducer', () => {
  it('should return initial state', () => {
    expect(fetchArticles(undefined, {})).toEqual(initialState);
  });

  it('should change articles state', () => {
    const articleList = [{
      results: {
        count: 1,
        next: null,
        previous: null,
        articles: [{
          slug: 'me-and-william',
          title: 'me and william',
          description: 'Verizon keeps trying to stop wireless workers from organizing. Instead their union is expanding.',
          body: 'My name is William and am a graduate software Engineer who has been volunteering to develop systems ',
          created_at: '2018-09-08T13:54:48.198104Z',
          updated_at: '2018-09-11T15:47:59.090374Z',
          author: {
            username: 'deriwilliams',
            email: 'william.sserubiri@andela.com',
            bio: '',
            image: '',
          },
          favorited: false,
          favoritesCount: 0,
          likesCount: 1,
          dislikesCount: 0,
          tags: [
            'books',
            'pipelines',
            'poetry',
          ],
          image: 'https://images.unsplash.com/photo-1527779924457-aec8bd402625?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=374c205ba7b271e5b04a9da4debc113a&auto=format&fit=crop&w=1987&q=80',
          rating: null,
        }],
      },
    }];

    const action = {
      type: START_FETCH_ARTICLES_FIRST_PAGE,
      payload: [{
        results: {
          count: 1,
          next: null,
          previous: null,
          articles: [{
            slug: 'me-and-william',
            title: 'me and william',
            description: 'Verizon keeps trying to stop wireless workers from organizing. Instead their union is expanding.',
            body: 'My name is William and am a graduate software Engineer who has been volunteering to develop systems ',
            created_at: '2018-09-08T13:54:48.198104Z',
            updated_at: '2018-09-11T15:47:59.090374Z',
            author: {
              username: 'deriwilliams',
              email: 'william.sserubiri@andela.com',
              bio: '',
              image: '',
            },
            favorited: false,
            favoritesCount: 0,
            likesCount: 1,
            dislikesCount: 0,
            tags: [
              'books',
              'pipelines',
              'poetry',
            ],
            image: 'https://images.unsplash.com/photo-1527779924457-aec8bd402625?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=374c205ba7b271e5b04a9da4debc113a&auto=format&fit=crop&w=1987&q=80',
            rating: null,
          }],
        },
      }],
    };

    const newState = fetchArticles(initialState, action);
    expect(newState.articles).toEqual(articleList);
  });

  it('should change hasMore when no more articles', () => {
    const hasMore = false;

    const initialState = {
      items: Array.from({ length: 5 }),
      articles: [],
      page: 1,
      hasMore: true,
    };

    const action = {
      type: END_LOADING_ARTICLES,
    };

    const newState = fetchArticles(initialState, action);
    expect(newState.hasMore).toEqual(hasMore);
  });

  it('should LoadMore articles', () => {
    const nextPage = 2;
    const currentItems = Array.from({ length: 5 });
    const newItems = currentItems.concat(Array.from({ length: 5 }));
    const canLoadMore = true;

    const initialState = {
      items: Array.from({ length: 5 }),
      articles: [],
      page: 1,
      hasMore: true,
    };

    const action = {
      type: LOAD_MORE_ARTICLES,
    };

    const newState = fetchArticles(initialState, action);
    expect(newState.page).toEqual(nextPage);
    expect(newState.items).toEqual(newItems);
    expect(newState.hasMore).toEqual(canLoadMore);
  });
});
