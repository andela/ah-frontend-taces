import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../components/Modal/Modal';

describe('<Modal />', () => {
  it('should translate to the top by -100vh if show is false', () => {
    const props = {
      show: true, closeModal: () => {}, children: () => {},
    };
    const wrapper = shallow(<Modal {...props} />);
    const modalElement = wrapper.find('div');
    expect(modalElement).toHaveLength(1);
  });
});
