import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import Store from '../../store/reducers';
// import { PASSWORD_RESET_START, PASSWORD_RESET_FAIL, PASSWORD_RESET_SUCCESS } from '../../store/actions/actionTypes';
import passwordResetReducer from '../../store/actions/passwordResetActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test pasword reset', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should mock password reset', () => {
    const passwordResetData = { email: 'someemail@hahah.com' };
    moxios.stubRequest('/api/users/password/forgot/', {
      status: 200,
      response: passwordResetData,
    });

    const expectedActions = [{ type: 'PASSWORD_RESET_START' }, { payload: 'Check you email for a reset link.', type: 'PASSWORD_RESET_SUCCESS' }];

    const store = mockStore({});


    store.dispatch(passwordResetReducer(passwordResetData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
