import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import { NotificationIcon } from '../../containers/notifications/NotificationIcon';
import { Notification } from '../../containers/notifications/Notifications';
import { NotificationBody } from '../../containers/notifications/NotificationBody';


describe('Test notifications', () => {
  let initialState;
  let wrapper;
  let store;
  const mockStore = configureStore();
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);

  beforeEach(() => {
    moxios.install();
    initialState = {};
    store = mockStore(initialState);

    const props = {
      notification: [
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
    };
    wrapper = shallow(<Notification {...props} store={store} />);
  });
  afterEach(() => moxios.uninstall());

  it('renders withou crashing', () => {
    const page = wrapper.find('div');
    expect(page).toHaveLength(2);
  });

  it('should call Pagination', () => {
    const spy = createSpy('Pagination');
    wrapper.instance().forceUpdate();
    const link = wrapper.find('#paginate');
    expect(link).toHaveLength(1);
    link.simulate('click', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalled();
  });

  it('should call optInForNotifications function', () => {
    const spy = createSpy('optInForNotifications');
    wrapper.instance().forceUpdate();
    const link = wrapper.find('#muteNotifications');
    expect(link).toHaveLength(1);
    link.simulate('click', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalled();
  });
});

it('<NotificationIcon />', () => {
  const wrapper = shallow(<NotificationIcon />);
  const page = wrapper.find('div');
  expect(page).toHaveLength(3);
});

it('<NotificationBody />', () => {
  const wrapper = shallow(<NotificationBody retrieveNotifications={jest.fn(() => [{}])} />);
  const page = wrapper.find('div');
  expect(page).toHaveLength(8);
});
