import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import FetchNotifications, { optInForNotifications } from '../../store/actions/notificationActions';
import {
  ALL_NOTIFICATIONS, FETCH_MORE,
} from '../../store/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Register user axios call', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch all notifications', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/', {
      status: 200,
      response: [
        {
          article: { title: 'code', slug: 'code' },
          author: { username: 'Abulo Joshua' },
          read_or_not_read: true,
        },
        {
          article: { title: 'codeing', slug: 'code-coding' },
          author: { username: 'Abulo Joshua' },
          read_or_not_read: false,
          created: '2018-09-20T14:53:18.915843Z',
        },
      ],
    });

    const store = mockStore();

    return store.dispatch(FetchNotifications(ALL_NOTIFICATIONS, 'https://authors-haven-tabs.herokuapp.com/api/'));
  });

  it('should paginate', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/', {
      status: 200,
      response: [
        {
          article: { title: 'code', slug: 'code' },
          author: { username: 'Abulo Joshua' },
          read_or_not_read: true,
        },
        {
          article: { title: 'codeing', slug: 'code-coding' },
          author: { username: 'Abulo Joshua' },
          read_or_not_read: false,
          created: '2018-09-20T14:53:18.915843Z',
        },
      ],
    });

    const store = mockStore();

    return store.dispatch(FetchNotifications(FETCH_MORE, 'https://authors-haven-tabs.herokuapp.com/api/'));
  });

  it('should break the switch statement', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/', {
      status: 200,
      response: [
        {
          article: { title: 'code', slug: 'code' },
          author: { username: 'Abulo Joshua' },
          read_or_not_read: true,
        },
        {
          article: { title: 'codeing', slug: 'code-coding' },
          author: { username: 'Abulo Joshua' },
          read_or_not_read: false,
          created: '2018-09-20T14:53:18.915843Z',
        },
      ],
    });

    const store = mockStore();

    return store.dispatch(FetchNotifications('NON_OF_THE_ACTIONTYPES', 'https://authors-haven-tabs.herokuapp.com/api/'));
  });


  it('should call optInForNotifications', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/user/notifications/opt_in_or_out', {
      status: 200,
      response: 'Opt in status for notifications is now changed to True',
    });

    return optInForNotifications();
  });

  it('should call markAsRead', () => {
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/user/notifications/read/2', {
      status: 201,
    });

    return optInForNotifications(2);
  });
});
