import React from 'react';
import { shallow } from 'enzyme';
import Backdrop from '../../components/Backdrop/Backdrop';

describe('<Backdrop />', () => {
  it('should render a div element when show is true', () => {
    const wrapper = shallow(<Backdrop />);
    wrapper.setProps({ show: true });
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
