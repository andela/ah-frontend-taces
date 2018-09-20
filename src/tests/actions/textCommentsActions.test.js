import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { fetchTextComments, postTextComment } from '../../store/actions/textCommentsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const resp = {
  results: [
    {
      selected: 'article text selected',
      body: 'Comment on text selected',
    },
  ],
};

const reqData = { selected: 'some-selected', body: 'body' };

describe('text comments axios calls', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('it should start fetching text comments and end with success', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/some-slug/all/text-comments/', {
      status: 200,
      response: resp,
    });

    const expectedActions = [{ type: 'START_FETCHING_ARTICLE_TEXT_COMMENTS' },
      { type: 'FETCHING_ARTICLE_TEXT_COMMENTS_SUCCESS', payload: resp.results }];

    const store = mockStore();
    return store.dispatch(fetchTextComments('some-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('it should start fetching text comments and end with failure', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/some-slug/all/text-comments/', {
      status: 404,
      response: resp,
    });

    const expectedActions = [{ type: 'START_FETCHING_ARTICLE_TEXT_COMMENTS' },
      { type: 'FETCHING_ARTICLE_TEXT_COMMENTS_FAIL', payload: 'ERROR' }];

    const store = mockStore();
    return store.dispatch(fetchTextComments('some-slug')).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('it should start posting a text comment and end with success', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/some-slug/text-comment/', {
      status: 201,
      response: { selected: 'some-selected', body: 'body' },
    });

    const expectedActions = [{ type: 'START_POSTING_ARTICLE_TEXT_COMMENT' },
      { type: 'POSTING_ARTICLE_TEXT_COMMENT_SUCCESS', payload: reqData }];

    const store = mockStore();
    return store.dispatch(postTextComment('some-slug', reqData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('it should start posting a text comment and end with failure', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/some-slug/text-comment/', {
      status: 404,
      response: { selected: 'some-selected', body: 'body' },
    });

    const expectedActions = [{ type: 'START_POSTING_ARTICLE_TEXT_COMMENT' },
      { type: 'POSTING_ARTICLE_TEXT_COMMENT_FAIL', payload: 'ERROR' }];

    const store = mockStore();
    return store.dispatch(postTextComment('some-slug', reqData)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
