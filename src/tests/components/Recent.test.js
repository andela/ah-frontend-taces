import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import Recent from '../../components/Recent/Recent';

describe('<Recent />', () => {
  let wrapper;
  const articles = [
    {
      author: {
        username: 'Abulo Joshua',
        email: 'abulojoshua1@gmail.com',
        bio: '',
        image: 'imgeUrl',
      },
      slug: 'slug',
      title: 'username',
      description: 'some description',
      body: 'body',
      image: 'imageurl',
    },
  ];
  const response = {
    results: { articles },
  };

  beforeEach(() => {
    moxios.install();
    // stab a request before rendering component
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/all/?page=1', {
      status: 200,
      response,
    });
    wrapper = shallow(<Recent />);
  });

  it('should call fetchArticles when component mounts', () => {
    const spy = jest.spyOn(wrapper.instance(), 'fetchArtciles');
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  describe('fetchResponse', () => {
    it('should call handleResponse when there is an API response', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
      await wrapper.instance().fetchArtciles();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleResponse', () => {
    it('handles user data response', () => {
      wrapper.instance().handleResponse(articles);
      expect(wrapper.state().articles).toBe(articles);
    });
  });
});
