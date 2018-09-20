import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { registerUser } from '../../store/actions/registerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const reqData = {
  user: {
    username: 'testandelauser',
    email: 'test.user@andela.com',
    password: 'iamsecret#',
    callbackurl: 'http://some_call_back_url.com',
  },
};

describe('Register user axios call', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should start registration and end with success', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/users/', {
      status: 201,
      response: reqData,
    });

    const expectedActions = [
      { type: 'REGISTRATION_START' },
      {
        payload: {
          callbackurl: 'http://some_call_back_url.com',
          email: 'test.user@andela.com',
          password: 'iamsecret#',
          username: 'testandelauser',
        },
        type: 'REGISTRATION_SUCCESS',
      },
      { type: 'SWITCH_TO_MODAL_TO_SUCCESS' },
    ];
    const store = mockStore();

    return store.dispatch(registerUser(reqData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should start registration and end with failure when improper data is provided', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/users/', {
      status: 400,
      response: {},
    });

    const expectedActions = [{ type: 'REGISTRATION_START' }, { type: 'REGISTRATION_FAILURE' }];
    const store = mockStore();

    return store.dispatch(registerUser(reqData)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
