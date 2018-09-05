import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../containers/Login/Login';

it('renders right text', () => {
  const wrapper = shallow(<Login />);
  const firstdiv = wrapper.find('div').first();
  expect(firstdiv.text()).toBe('Login form here.');
});
