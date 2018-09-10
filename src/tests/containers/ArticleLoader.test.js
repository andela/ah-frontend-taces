import React from 'react';
import { shallow } from 'enzyme';
import ArticleLoader from '../../containers/Loaders/ArticleLoader';

it('have right num of divs', () => {
  const wrapper = shallow(<ArticleLoader />);
  const firstdiv = wrapper.find('div').first();
  expect(firstdiv.children().length).toBe(6);
});
