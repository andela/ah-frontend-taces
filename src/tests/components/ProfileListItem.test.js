import React from 'react';
import { mount } from 'enzyme';
import { ProfileListItem } from '../../components/Profile/ProfileListItem';

describe('test profile list items', () => {
  it('should diplay list items', () => {
    const wrapper = mount(<ProfileListItem />);
    const divs = wrapper.find('div');
    expect(divs.length).toBe(5);
  });
});
