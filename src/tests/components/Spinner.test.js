import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../components/Spinner/Spinner';

describe('<Spinner />', () => {
  it('should render a div element', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
