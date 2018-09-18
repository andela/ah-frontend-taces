import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SearchGrid } from '../../containers/Search/SearchGrid';
import { SearchGridItem } from '../../components/Search/SearchGridItem';

describe('test search grid', () => {
  let wrapper;
  let parentWrapper;

  beforeEach(() => {
    moxios.install();
    const match = { params: { context: 'author', value: 'phillip' } };
    parentWrapper = mount(
      <BrowserRouter>
        <SearchGrid match={match} />
      </BrowserRouter>,
    );
    wrapper = parentWrapper.find(SearchGrid);
  });

  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe('retrievedData', () => {
    it('should call getArticles', () => {
      const spy = jest.spyOn(wrapper.instance(), 'getArticles');
      wrapper.instance().retrievedData('author', 'phillip');
      expect(spy).toBeCalled();
    });
  });

  describe('getArticles', () => {
    it('should calls handleResponse', async () => {
      const articles = [
        {
          slug: 'the-lord-of-the-rings-still-holds-up',
          title: 'The lord of the rings still holds up',
          description: 'this is a new article',
          body: 'You have to believe',
          created_at: '2018-09-09T07:38:27.351938Z',
          updated_at: null,
          author: {
            username: 'Seryazi',
            email: 'phillip.seryazi@andela.com',
            bio: 'i love sport',
          },
          favorited: false,
          favoritesCount: 0,
          likesCount: 0,
          dislikesCount: 0,
          tags: [],
          image: 't=crop&w=1950&q=80',
        },
      ];

      const results = { articles };
      const context = 'author';
      const val = 'phillip';
      moxios.stubRequest(
        `https://authors-haven-tabs.herokuapp.com/api/articles/search?${context}=${val}`,
        {
          status: 200,
          response: { results },
        },
      );
      const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
      await wrapper.instance().getArticles('author', 'phillip');
      expect(spy).toBeCalled();
    });
  });
});
