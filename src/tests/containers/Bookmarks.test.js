import React from 'react';
import { shallow } from 'enzyme';
import Bookmarks from '../../containers/Bookmarks/Bookmarks';

const localStore = [];
const bookMark = {
  slug: 'this-is-a-slug',
  user: 'me@MediaList.com',
  objectId: 'unique-value',
};
describe('Bookmarks', () => {
  beforeEach(() => {
    localStore.push(bookMark);
    localStore.push(bookMark);
    localStorage.setItem('bookmarks', JSON.stringify(localStore));
  });

  describe('h5', () => {
    it('should have the right count', () => {
      const wrapper = shallow(<Bookmarks />);
      const firsth5 = wrapper.find('h5').first();
      expect(firsth5.length).toBe(1);
    });

    it('should have the right text', () => {
      const wrapper = shallow(<Bookmarks />);
      const firsth5 = wrapper.find('h5').first();
      expect(firsth5.text()).toBe('BOOKMARKED ARTICLES');
    });
  });

  describe('NavLink', () => {
    it('should have the right count', () => {
      const wrapper = shallow(<Bookmarks />);
      const navlink = wrapper.find('NavLink');
      expect(navlink.length).toBe(1);
    });
    it('should have the right text', () => {
      const wrapper = shallow(<Bookmarks />);
      const navlink = wrapper.find('NavLink');
      expect(navlink.text()).toBe('<NavLink />');
    });
  });

  it('should have right content for bookmarks exist', () => {
    const wrapper = shallow(<Bookmarks />);
    wrapper.setState({
      hasContent: true,
    });
    const notBookmarked = wrapper.find('h4');
    expect(notBookmarked.length).toBe(0);
  });

  it('should have right content for no bookmarks', () => {
    const wrapper = shallow(<Bookmarks />);
    wrapper.setState({
      hasContent: false,
    });
    const notBookmarked = wrapper.find('h4');
    expect(notBookmarked.length).toBe(1);
  });

  it('have set the right state for no bookmarks ', () => {
    localStorage.removeItem('bookmarks');
    const wrapper = shallow(<Bookmarks />);
    expect(wrapper.state().hasContent).toEqual(false);
  });

  it('have set the right state for user has bookmarks', () => {
    localStorage.setItem('email', 'me@MediaList.com');
    localStorage.setItem('bookmarks', JSON.stringify(localStore));
    const wrapper = shallow(<Bookmarks />);
    expect(wrapper.state().hasContent).toEqual(true);
  });

  describe('hasBookmark', () => {
    it('should call the right function', () => {
      const wrapper = shallow(<Bookmarks />);
      const spy = jest.spyOn(wrapper.instance(), 'listBookmarkedArticles');
      wrapper.instance().hasBookmark();
      expect(spy).toHaveBeenCalled();
    });
  });
});
