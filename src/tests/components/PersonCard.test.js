import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import { PersonCard } from '../../components/Profile/PersonCard';

describe('testn for person card', () => {
  const updateGrid = jest.fn();
  const wrapper = shallow(<PersonCard updateGrid={updateGrid} />);
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('test person card', () => {
    it('should display peron card', () => {
      const divWrapper = mount(<PersonCard />);
      const divs = divWrapper.find('div');
      expect(divs.length).toBe(5);
    });
  });

  describe('unfollowUser', () => {
    it('mocks unfollow user method', () => {
      const spy = jest.spyOn(wrapper.instance(), 'unfollowUser');
      wrapper.instance().forceUpdate();

      wrapper
        .find('.card-body button.btn-outline-dark')
        .simulate('click', { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('changeButtonText', () => {
    it('mocks if change button method is called', () => {
      const spy = jest.spyOn(wrapper.instance(), 'changeButtonText');
      wrapper.instance().forceUpdate();

      wrapper
        .find('.card-body button.btn-outline-dark')
        .simulate('mouseover', { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('resetButtonText', () => {
    it('mocks if reset button method is called', () => {
      const spy = jest.spyOn(wrapper.instance(), 'resetButtonText');
      wrapper.instance().forceUpdate();

      wrapper
        .find('.card-body button.btn-outline-dark')
        .simulate('mouseleave', { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });
});
