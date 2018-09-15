import React from 'react';
import {
  shallow,
} from 'enzyme';
import ArticleListItem from '../../containers/Articles/ArticleListItem/ArticleListItem';

const props = {
  items: Array.from({ lenght: 5 }),
  author: {
    username: 'Abulo',
    email: 'abulojoshua1@outlook.com',
    bio: 'this is a bio',
    image: null,
  },
  body: 'The standard Lorem Ipsum passage',
  created_at: '2018-09-13T07:16:46.839514Z',
  description: 'Description',
  dislikesCount: 0,
  favorited: false,
  favoritesCount: 0,
  image: null,
  likesCount: 0,
  rating: null,
  slug: 'this-i-an-article-12ffde12-d2dc-4b05-95df-e4eae6b33273',
  tags: (2)['tagga', 'tag'],
  title: 'this i an article',
  updated_at: null,
};

it('should have seven divs', () => {
  const wrapper = shallow(<ArticleListItem {...props} />);
  const firstdiv = wrapper.find('div').first();
  expect(firstdiv.children().length).toBe(4);
});
