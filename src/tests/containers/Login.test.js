import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import { Login } from '../../containers/Login/Login';


describe('Test pasword reset', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('calls eventListener', () => {
    const loginData = { data: { username: 'someName', email: 'email@email.com' } };

    moxios.stubRequest('/api/users/password/forgot/', {
      status: 400,
      response: loginData,
    });

    const wrapper = mount(<Login />);
    const eventListener = jest.spyOn(wrapper.instance(), 'eventListener');
    const loginSubmit = jest.spyOn(wrapper.instance(), 'loginSubmit');
    wrapper.instance().forceUpdate();
    const title = wrapper.find('input[name="password"]');
    title.simulate('change', { target: { value: 'some password', name: 'password' } });
    title.simulate('change', { target: { value: 'some@email.com', name: 'email' } });
    expect(eventListener).toHaveBeenCalled();
    wrapper.find('form').simulate('submit');
    expect(loginSubmit).toHaveBeenCalled();
  });
});
