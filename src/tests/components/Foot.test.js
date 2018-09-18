import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Foot/Foot';

describe('<Footer />', () => {
  it('should render two <p> html elements', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('p')).toHaveLength(1);
  });
});
