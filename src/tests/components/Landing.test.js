import React from 'react';
import { shallow } from 'enzyme';
import Landing from '../../components/Landing/Landing';

describe('Landing />', () => {
  it('should render two buttons', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should translate to the left by -100vh', () => {
    const wrapper = shallow(<Landing show={false} />);
    const wrapperStyle = wrapper.get(0).props.style;
    expect(wrapperStyle).toHaveProperty('transform', 'translateX(-100vw)');
  });

  it('should not translate to the left by -100vh if show is true', () => {
    const wrapper = shallow(<Landing show={true} />);
    const wrapperStyle = wrapper.get(0).props.style;
    expect(wrapperStyle).toHaveProperty('transform', null);
  });
});
