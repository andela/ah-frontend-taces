import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import Like from '../../containers/Like/Like';

describe('<Like />', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should make token a string', () => {
    const wrapper = mount(<Like />);
    const setToken = wrapper.instance().setTokenValue;
    expect(setToken()).toEqual('');
  });

  it('should return token', () => {
    const wrapper = mount(<Like />);
    localStorage.setItem('token', 'some-token');
    const setToken = wrapper.instance().setTokenValue;
    expect(setToken()).toEqual('some-token');
  });

  it('should initially show zero likes and dislikes', () => {
    const wrapper = mount(<Like />);
    wrapper.setState({ likesCount: 0, dislikesCount: 0 });
    expect(wrapper.state().likesCount).toEqual(0);
    expect(wrapper.state().dislikesCount).toEqual(0);
  });

  it('should show blue thumbs up if user already liked and black thumbs down', () => {
    const wrapper = mount(<Like />);
    wrapper.setState({ liked: true });
    const likeButton = wrapper.find('.fa-thumbs-up');
    const dislikeButton = wrapper.find('.fa-thumbs-down');
    expect(likeButton.props().style.color).toBe('blue');
    expect(dislikeButton.props().style.color).toBe('black');
  });

  it('should show blue thumbs down if user already disliked and black thumbs up', () => {
    const wrapper = mount(<Like />);
    wrapper.setState({ disliked: true });
    const likeButton = wrapper.find('.fa-thumbs-up');
    const dislikeButton = wrapper.find('.fa-thumbs-down');
    expect(likeButton.props().style.color).toBe('black');
    expect(dislikeButton.props().style.color).toBe('blue');
  });

  it('should specify response for like request', done => {
    const wrapper = mount(<Like />);
    const expectedResponse = {
      likesCount: 1,
      dislikesCount: 0,
    };
    const likeButton = wrapper.find('.fa-thumbs-up');
    likeButton.simulate('click');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          likesCount: 1,
          dislikesCount: 0,
        },

      })
        .then((res) => {
          expect(res.data).toEqual(expectedResponse);
          done();
        });
    });
  });


  it('should specify response for dislike request', done => {
    const wrapper = mount(<Like />);
    const expectedResponse = {
      likesCount: 0,
      dislikesCount: 1,
    };
    const dislikeButton = wrapper.find('.fa-thumbs-down');
    dislikeButton.simulate('click');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          likesCount: 0,
          dislikesCount: 1,
        },

      })
        .then((res) => {
          expect(res.data).toEqual(expectedResponse);
          done();
        });
    });
  });
});
