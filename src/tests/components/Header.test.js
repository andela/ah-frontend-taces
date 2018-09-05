import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header/Header';

describe('<Header />', () => {
  it('should render two <p> html elements', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('nav')).toHaveLength(1);
  });
});
