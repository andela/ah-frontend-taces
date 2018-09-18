import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Header } from '../../containers/Header/Header';

describe('<Header />', () => {
  it('should render two <p> html elements', () => {
    const props = {
      authStatus: true,
      ProfileDropdownState: true,
      TOGGLE_PROFILE_ACTION: () => {},
      clickSignin: () => {},
      clickSignup: () => {},
    };

    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({ authStatus: true, ProfileDropdownState: true });
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('div').length).toBe(12);
  });

  describe('setContext', () => {
    it('changes selected context', () => {
      const props = {
        authStatus: true,
        ProfileDropdownState: true,
        TOGGLE_PROFILE_ACTION: () => {},
        clickSignin: () => {},
        clickSignup: () => {},
      };

      const wrapper = shallow(<Header {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'setContext');
      wrapper.instance().forceUpdate();

      const newChange = wrapper.find('select[name="contextSelector"]');
      newChange.simulate('change', { target: { value: 'Author', name: 'contextSelector' } });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setValue', () => {
    it('changes entered value', () => {
      const props = {
        authStatus: true,
        ProfileDropdownState: true,
        TOGGLE_PROFILE_ACTION: () => {},
        clickSignin: () => {},
        clickSignup: () => {},
      };

      const wrapper = shallow(<Header {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'setValue');
      wrapper.instance().forceUpdate();

      const newChange = wrapper.find('input[name="searchInput"]');
      newChange.simulate('change', { target: { value: 'phillip', name: 'searchInput' } });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setContext', () => {
    it('changes selected context', () => {
      const props = {
        authStatus: true,
        ProfileDropdownState: true,
        TOGGLE_PROFILE_ACTION: () => {},
        clickSignin: () => {},
        clickSignup: () => {},
      };

      const wrapper = shallow(<Header {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'setContext');
      wrapper.instance().forceUpdate();

      const newChange = wrapper.find('select[name="contextSelector"]');
      newChange.simulate('change', { target: { value: 'Author', name: 'contextSelector' } });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setValue', () => {
    it('changes entered value', () => {
      const props = {
        authStatus: true,
        ProfileDropdownState: true,
        TOGGLE_PROFILE_ACTION: () => {},
        clickSignin: () => {},
        clickSignup: () => {},
      };

      const wrapper = shallow(<Header {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'setValue');
      wrapper.instance().forceUpdate();

      const newChange = wrapper.find('input[name="searchInput"]');
      newChange.simulate('change', { target: { value: 'phillip', name: 'searchInput' } });
      expect(spy).toHaveBeenCalled();
    });
  });
});
