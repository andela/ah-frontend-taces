import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  loadMoreArticles, fetchArticles,
} from '../../store/actions/articleListActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const responseResults = {
  results: {
    count: 85,
    next: 'https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=2',
    previous: null,
    articles: [{
      slug: 'lorem-ipsum-dolor-sit-amet-consectetuer-adipiscing-elit',
      title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
      description: 'nascetur ridiculus mus',
      body: 'senectus et netus et mal',
      created_at: '2018-09-14T12:21:06.606154Z',
      updated_at: '2018-09-14T12:21:21.099253Z',
      author: {
        username: 'Abulo jj',
        email: 'abulojoshua1@gmail.com',
        bio: 'Am a developer.',
        image: 'http://res.cloudinary.com/ronzalo777/image/upload/v1536927998/egaykzv7kgdoo38sr5wh.jpg',
      },
      favorited: false,
      favoritesCount: 0,
      likesCount: 1,
      dislikesCount: 0,
      tags: [
        ' demo call',
        'dummy text',
      ],
      image: 'http://res.cloudinary.com/dqhowauvv/image/upload/v1536927657/cgxn59hk5dtgy1q40jfq.jpg',
      rating: null,
    }],
  },
};
const items = [1, 2, 3, 4, 5];

describe('articleListActions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('fetchArticles', () => {
    it('should dispatch the right action and payload', () => {
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=1', {
        status: 200,
        response: responseResults,
      });

      const expectedActions = [
        {
          payload: responseResults.results.articles,
          type: 'START_FETCH_ARTICLES_FIRST_PAGE',
        },
      ];
      const store = mockStore();

      return store.dispatch(fetchArticles(1, items)).then(() => {
        expect(store.getActions()[0].payload).toEqual(responseResults.results.articles);
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should end pagination when there are no more articles', () => {
      const responseResults = {
        results: {
          count: 1,
        },
      };

      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=1', {
        status: 200,
        response: responseResults,
      });

      const expectedActions = [{ type: 'END_LOADING_ARTICLES' }];
      const store = mockStore();

      return store.dispatch(fetchArticles(1, items)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch right action for 404 response', () => {
      const responseResults = {
        results: {
          detail: 'Invalid page.',
        },
      };

      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=1', {
        status: 404,
        response: responseResults,
      });

      const expectedActions = [{ type: 'END_LOADING_ARTICLES' }];
      const store = mockStore();

      return store.dispatch(fetchArticles(1, items)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('loadmoreArticles', () => {
    it('should dispatch actions to load more Articles', () => {
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=1', {
        status: 200,
        response: responseResults,
      });

      const expectedActions = [{ type: 'LOAD_MORE_ARTICLES' },
        { type: 'START_FETCH_ARTICLES_FIRST_PAGE', payload: 1 }];
      const store = mockStore();

      store.dispatch(loadMoreArticles(1, responseResults));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
