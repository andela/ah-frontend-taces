import React from 'react';
import { shallow } from 'enzyme';
import Error403 from '../../components/Errors/Error403/Error403';

describe('Error404', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Error403 />);
  });

  it('have right num of divs', () => {
    const firstdiv = wrapper.find('div').first();
    expect(firstdiv.children().length).toBe(1);
  });
  describe('h6', () => {
    it('should have the right text', () => {
      const firstdiv = wrapper.find('h6');
      expect(firstdiv.length).toBe(1);
      expect(firstdiv.text()).toEqual('WE NEED TO KNOW YOU!');
    });
  });
});
