import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import { Login } from '../../containers/Login/Login';


describe('Test pasword reset', () => {

  let initialState;
  let wrapper;
  let store;
  const mockStore = configureStore();
  const loginData = { data: { username: 'someName', email: 'email@email.com' } };
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);

  beforeEach(() => {
    moxios.install();
    initialState = {};
    store = mockStore(initialState);
    wrapper = shallow(<Login store={store} />);
    moxios.stubRequest('/api/users/password/forgot/', {
      status: 400,
      response: loginData,
    });
  });
  afterEach(() => moxios.uninstall());

  it('calls eventListener', () => {
    const spy = createSpy('eventListener');
    wrapper.instance().forceUpdate();
    const title = wrapper.find('input[name="password"]');
    title.simulate('change', { target: { value: 'some password', name: 'password' } });
    expect(spy).toHaveBeenCalled();
  });

  it('should call loginSubmit', () => {
    const spy = createSpy('loginSubmit');
    const email = wrapper.find('input[name="email"]');
    email.simulate('change', { target: { value: 'test@gmail.com', name: 'email' } });
    const password = wrapper.find('input[name="password"]');
    password.simulate('change', { target: { value: '#pass@123', name: 'password' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalled();
  });
});
