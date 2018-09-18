import React from 'react';
import { shallow } from 'enzyme';
import Error404 from '../../components/Errors/Error404/Error404';

describe('Error404', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Error404 />);
  });

  it('have right num of divs', () => {
    const firstdiv = wrapper.find('div').first();
    expect(firstdiv.children().length).toBe(1);
  });

  describe('h6', () => {
    it('should have the right text', () => {
      const firstdiv = wrapper.find('h6');
      expect(firstdiv.length).toBe(1);
      expect(firstdiv.text()).toEqual('YOU ARE GETTING LOST!');
    });
  });
});
