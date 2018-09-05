import React from 'react';
import { shallow } from 'enzyme';
import Register from '../../containers/Register/Register';

it('renders right text', () => {
  const wrapper = shallow(<Register />);
  const firstdiv = wrapper.find('div').first();
  expect(firstdiv.text()).toBe('Register form here.');
});
