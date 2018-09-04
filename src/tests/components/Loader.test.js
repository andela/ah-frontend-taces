import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from '../../components/Loader/Loader';

describe('<Loader />', () => {
  it('test loader', () => {
    const wrapper = shallow(<Loader />);
    const modalElement = wrapper.find('div');
    expect(modalElement).toHaveLength(4);
  });
});
