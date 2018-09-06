import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../containers/Header/Header';

describe('<Header />', () => {
  it('should render two <p> html elements', () => {
    const props = {
      authStatus: true,
      ProfileDropdownState: true,
      TOGGLE_PROFILE_ACTION: () => {},
      clickSignin: () => { },
      clickSignup: () => { },
    };

    const wrapper = shallow(<Header {...props} />);
    wrapper.setProps({ authStatus: true, ProfileDropdownState: true });
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('div').length).toBe(9);
  });
});
