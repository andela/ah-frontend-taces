import React from 'react';
import { shallow } from 'enzyme';
import Wrapper from '../../hoc/Wrapper/Wrapper';

it('renders right text', () => {
  const wrapper = shallow(<Wrapper />);
  expect(wrapper.type()).toBe('div');
});
