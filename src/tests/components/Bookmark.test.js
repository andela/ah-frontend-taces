import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import Bookmark from '../../components/Bookmark/Bookmark';

describe('Bookmark', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make token a string', () => {
    const wrapper = mount(<Bookmark />);
    const setToken = wrapper.instance().setTokenValue;
    expect(setToken()).toEqual('');
  });

  it('should return token', () => {
    const wrapper = mount(<Bookmark />);
    localStorage.setItem('token', 'some-token');
    const setToken = wrapper.instance().setTokenValue;
    expect(setToken()).toEqual('some-token');
  });

  it('should set isfavorited state to false', () => {
    const wrapper = mount(<Bookmark favorited={false} />);
    wrapper.setProps({
      favorited: false,
    });
    const setDefaultFavourite = wrapper.instance().checkDefaultFavorite;
    expect(setDefaultFavourite()).toEqual(false);
    expect(wrapper.state().isfavorited).toEqual(false);
  });

  it('should set isfavorited state to true', () => {
    const wrapper = mount(<Bookmark favorited />);
    wrapper.setProps({
      favorited: true,
    });
    const setDefaultFavourite = wrapper.instance().checkDefaultFavorite;
    expect(setDefaultFavourite()).toEqual(true);
    expect(wrapper.state().isfavorited).toEqual(true);
  });

  it('should initially not mark article as bookmarked', () => {
    const wrapper = mount(<Bookmark />);
    wrapper.setState({ isfavorited: false });
    expect(wrapper.state().isfavorited).toEqual(false);
  });

  it('should have right class for un bookmarked articles', () => {
    const wrapper = mount(<Bookmark />);
    wrapper.setState({ isfavorited: false });
    const notBookmarked = wrapper.find('.fa-bookmark-o');
    expect(notBookmarked.length).toBe(1);
  });

  it('should have right class for non bookmarked articles', () => {
    const wrapper = mount(<Bookmark />);
    wrapper.setState({ isfavorited: true });
    const bookmarked = wrapper.find('.fa-bookmark');
    expect(bookmarked.length).toBe(1);
  });

  it('should have specific response for bookmark request', done => {
    const wrapper = mount(<Bookmark />);
    const expectedResponse = {
      isfavorited: true,
    };
    const bookmarkButton = wrapper.find('.fa-bookmark-o');
    bookmarkButton.simulate('click');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          isfavorited: true,
        },

      })
        .then((res) => {
          expect(res.data).toEqual(expectedResponse);
          done();
        });
    });
  });

  it('should have specific response for remove bookmark request', done => {
    const wrapper = mount(<Bookmark favorited />);
    const expectedResponse = {
      isfavorited: false,
    };
    const bookmarkButton = wrapper.find('.fa-bookmark');
    bookmarkButton.simulate('click');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          isfavorited: false,
        },

      })
        .then((res) => {
          expect(res.data).toEqual(expectedResponse);
          done();
        });
    });
  });

  it('should have specific response for un bookmark request', () => {
    const wrapper = mount(<Bookmark favorited articleSlug />);
    const spy = jest.spyOn(wrapper.instance(), 'removeBookmark');
    wrapper.instance().toggleFavourite();
    expect(spy).toHaveBeenCalled();
  });
});
