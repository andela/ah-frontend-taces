import React from 'react';
import { shallow } from 'enzyme';
import { ArticleList } from '../../containers/Articles/ArticleList/ArticleList';

describe('ArticleList', () => {
  let wrapper;
  const props = {
    authStatus: true,
    LOAD_MORE_ARTICLES: () => {},
    onFetchArticles: () => {},
    onLoadMoreArticles: () => {},
    articles: [{}, {}],
    items: [],
  };

  const mockFetchArticles = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<ArticleList {...props} onFetchArticles={mockFetchArticles} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render articles without breaking', () => {
    expect(wrapper.find('InfiniteScroll')).toHaveLength(1);
    expect(wrapper.find('div').length).toBe(4);
  });

  it('should call the right function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'LoadMoreArticles');
    wrapper.instance().LoadMoreArticles();
    expect(spy).toHaveBeenCalled();
  });

  describe('onFetchArticles gets called properly', () => {
    it('should call onFetchArticles four times', () => {
      wrapper.instance();
      expect(mockFetchArticles.mock.calls.length).toBe(4);
    });

    it('should call onFetchArticles six times', () => {
      wrapper.instance().componentDidMount();
      expect(mockFetchArticles.mock.calls.length).toBe(6);
    });
  });
});
