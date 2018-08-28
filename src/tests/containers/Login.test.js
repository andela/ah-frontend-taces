import React from 'react';
import { mount } from 'enzyme';
import mockAxios from 'axios';
import { Login } from '../../containers/Login/Login';

it('calls eventListener', () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { username: 'someName', email: 'email@email.com' } }));

  const wrapper = mount(<Login />);
  const spy = jest.spyOn(wrapper.instance(), 'eventListener');
  const spy2 = jest.spyOn(wrapper.instance(), 'loginSubmit');
  wrapper.instance().forceUpdate();
  const title = wrapper.find('input[name="password"]');
  title.simulate('change', { target: { value: 'some password', name: 'password' } });
  title.simulate('change', { target: { value: 'some@email.com', name: 'email' } });
  expect(spy).toHaveBeenCalled();
  wrapper.find('form').simulate('submit');
  expect(spy2).toHaveBeenCalled();
});
