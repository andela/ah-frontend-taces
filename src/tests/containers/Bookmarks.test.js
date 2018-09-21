import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import { BrowserRouter } from 'react-router-dom';
import { Bookmarks } from '../../containers/Bookmarks/Bookmarks';

const props = {
  authStatus: true,
  LOAD_MORE_ARTICLES: () => {},
  onFetchArticles: () => {},
  onLoadMoreArticles: () => {},
  results: {
    count: 3,
    next: null,
    previous: null,
    articles: [{
      slug: 'this-is-the-first-article',
      title: 'this is the first article',
      description: 'description 1',
      body: 'http://ugextra.com',
      created_at: '2018-09-22T20:42:46.918908Z',
      updated_at: '2018-09-22T20:45:15.774647Z',
      author: {
        username: '@ssewillia',
        email: 'serubiri.sserubiri@andela.com',
        bio: '',
        image: '',
      },
      favorited: true,
      favoritesCount: 2,
      likesCount: 0,
      dislikesCount: 0,
      tags: [
        'today the things',
        'everything works',
        'me',
      ],
      image: null,
      rating: null,
      viewsCount: 0,
    },
    {
      slug: 'this-is-the-second-article',
      title: 'this is the second article',
      description: 'description 2',
      body: 'http://ugextra.com',
      created_at: '2018-09-22T20:42:39.005873Z',
      updated_at: '2018-09-22T20:52:07.361889Z',
      author: {
        username: '@ssewillia',
        email: 'serubiri.sserubiri@andela.com',
        bio: '',
        image: '',
      },
      favorited: true,
      favoritesCount: 1,
      likesCount: 0,
      dislikesCount: 0,
      tags: [
        'today the things',
        'everything works',
        'me',
      ],
      image: null,
      rating: null,
      viewsCount: 0,
    },
    {
      slug: 'this-is-the-third-article',
      title: 'this is the third article',
      description: 'description 3',
      body: 'http://ugextra.com',
      created_at: '2018-09-22T20:42:11.558421Z',
      updated_at: '2018-09-22T20:51:47.010378Z',
      author: {
        username: '@ssewillia',
        email: 'serubiri.sserubiri@andela.com',
        bio: '',
        image: '',
      },
      favorited: true,
      favoritesCount: 2,
      likesCount: 0,
      dislikesCount: 0,
      tags: [
        'today the things',
        'everything works',
        'me',
      ],
      image: null,
      rating: null,
      viewsCount: 0,
    },
    ],
  },
  items: [],
};

describe('Bookmarks', () => {
  let wrapper;
  let parentWrapper;
  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <Bookmarks />
      </BrowserRouter>,
    );
    wrapper = parentWrapper.find(Bookmarks);
  });
  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });


  it('should render bookmarks without breaking', async () => {
    const data = {
      data: {
        results: {
          count: 3,
          next: null,
          previous: null,
          articles: [{
            slug: 'this-is-the-article',
            title: 'this is the article',
            description: 'description',
            body: 'https://app.com',
            created_at: '2018-09-22T20:42:11.558421Z',
            updated_at: '2018-09-22T20:51:47.010378Z',
            author: {
              username: '@username',
              email: 'me@mail.com',
              bio: '',
              image: '',
            },
            favorited: true,
            favoritesCount: 2,
            likesCount: 0,
            dislikesCount: 0,
            tags: [
              'today',
              'everything',
              'man',
            ],
            image: null,
            rating: null,
            viewsCount: 0,
          },
          ],
        },
      },
    };
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/search?favorite&page=1', {
      status: 200,
      response: data,
    });
    const res = await wrapper.instance().fetchbookmarks();
    expect(res.data.results).toBe(props.articles);
  });
  describe('handleResponse', () => {
    it('should change article state', () => {
      const articles = [{
        slug: 'this-is-the-article',
        title: 'this is the article',
        description: 'description',
        body: 'https://app.com',
        created_at: '2018-09-22T20:42:11.558421Z',
        updated_at: '2018-09-22T20:51:47.010378Z',
        author: {
          username: '@username',
          email: 'me@mail.com',
          bio: '',
          image: '',
        },
        favorited: true,
        favoritesCount: 2,
        likesCount: 0,
        dislikesCount: 0,
        tags: [
          'today',
          'everything',
          'man',
        ],
        image: null,
        rating: null,
        viewsCount: 0,
      }];
      wrapper.instance().handleResponse('articles', articles);
      expect(wrapper.instance().state.articles).toBe(articles);
    });
  });
  describe('renderBookmarks', () => {
    it('should call fetchbookmarks ', () => {
      const spy = jest.spyOn(wrapper.instance(), 'fetchbookmarks');
      wrapper.instance().renderBookmarks();
      expect(spy).toBeCalled();
    });
  });
  describe('renderBookmarks', () => {
    it('should call handle response', async () => {
      const articlesList = {
        results: {
          count: 1,
          articles: [{
            slug: 'this-is-the-article',
            title: 'this is the article',
            description: 'description',
            body: 'https://app.com',
            created_at: '2018-09-22T20:42:11.558421Z',
            updated_at: '2018-09-22T20:51:47.010378Z',
            author: {
              username: '@username',
              email: 'me@mail.com',
              bio: '',
              image: '',
            },
            favorited: true,
            favoritesCount: 2,
            likesCount: 0,
            dislikesCount: 0,
            tags: [
              'today',
              'everything',
              'man',
            ],
            image: null,
            rating: null,
            viewsCount: 0,
          }],
        },
      };
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/search?favorite&page=1', {
        status: 200,
        response: articlesList,
      });
      const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
      await wrapper.instance().renderBookmarks();
      expect(spy).toBeCalled();
    });
    it('should call handle response', async () => {
      const articlesList = {
        results: {
          count: 0,
          articles: [],
        },
      };
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/search?favorite&page=1', {
        status: 200,
        response: articlesList,
      });
      const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
      await wrapper.instance().renderBookmarks();
      expect(spy).toBeCalled();
    });
  });
  it('should call the right function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'loadMoreBookmarks');
    wrapper.instance().loadMoreBookmarks();
    expect(spy).toHaveBeenCalled();
  });
});
