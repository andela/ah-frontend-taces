import notificationReducer from '../../store/reducers/notificationReducer';
import {
  ALL_NOTIFICATIONS, FETCH_MORE, READ, TOGGLE_MUTE_NOTIFICATIONS,
} from '../../store/actions/actionTypes';

describe('toggleLandingPageReducer', () => {
  it('should return the initial state', () => {
    const notifications = [];
    const HideLoadMore = false;
    const muteNotifications = false;

    const newState = notificationReducer(undefined, {});
    expect(newState.notifications).toEqual(notifications);
    expect(newState.HideLoadMore).toEqual(HideLoadMore);
    expect(newState.muteNotifications).toEqual(muteNotifications);
  });

  it('fetch all notifications', () => {
    const notifications = [
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
    ];
    const HideLoadMore = false;
    const muteNotifications = false;

    const initialState = {
      notifications: [],
      HideLoadMore: false,
      muteNotifications: false,
    };

    const action = {
      type: ALL_NOTIFICATIONS,
      payload: { results: notifications, nextPage: 'someUrl.com', count: 8 },
    };

    const newState = notificationReducer(initialState, action);
    expect(newState.notifications).toEqual(notifications);
    expect(newState.HideLoadMore).toEqual(HideLoadMore);
    expect(newState.muteNotifications).toEqual(muteNotifications);
  });

  it('fetch paginate', () => {
    const notifications = [
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
    ];
    const HideLoadMore = undefined;
    const muteNotifications = false;

    const initialState = {
      notifications: [],
      HideLoadMore: false,
      muteNotifications: false,
    };

    const action = {
      type: FETCH_MORE,
      payload: { results: notifications, nextPage: 'someUrl.com', count: 8 },
    };

    const output = [{
      count: 8,
      nextPage: 'someUrl.com',
      results: [{ article: { slug: 'code', title: 'code' }, author: { username: 'Abulo Joshua' }, read_or_not_read: true }, {
        article: { slug: 'code-coding', title: 'codeing' }, author: { username: 'Abulo Joshua' }, created: '2018-09-20T14:53:18.915843Z', read_or_not_read: false,
      }],
    }];

    const newState = notificationReducer(initialState, action);
    expect(newState.notifications).toEqual(output);
    expect(newState.HideLoadMore).toEqual(HideLoadMore);
    expect(newState.muteNotifications).toEqual(muteNotifications);
  });

  it('Mute or Unmute notifications', () => {
    const muteNotifications = true;

    const initialState = {
      notifications: [],
      HideLoadMore: false,
      muteNotifications: false,
    };

    const action = {
      type: TOGGLE_MUTE_NOTIFICATIONS,
    };

    const newState = notificationReducer(initialState, action);
    expect(newState.muteNotifications).toEqual(muteNotifications);
  });
});
