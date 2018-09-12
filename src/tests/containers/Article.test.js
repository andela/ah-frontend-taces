import moxios from 'moxios';
import React from 'react';
import { shallow } from 'enzyme';
import { Article } from '../../containers/Articles/Article';

import { fetchPost, sendRating } from '../../containers/lib';
import { CreateComment } from '../../containers/Comments/CreateComment';

describe('<Article />', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const props = {
    match: {
      params: {
        slug: 'me-and-william',
      },
    },
    authStatus: true,
  };

  const data = { data: { title: 'this is my article', slug: 'this-is-my-article' } };
  const wrapper = shallow(<Article {...props} />);

  it('fecthes and returns an article', async () => {
    moxios.stubRequest(
      `https://authors-haven-tabs.herokuapp.com/api/articles/search?slug=${
        data.slug
      }`,
      {
        status: 200,
        response: data,
      },
    );

    const expectedArticle = [{ title: 'test' }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: expectedArticle });
    });

    const result = await fetchPost('me-and-william');
    expect(result).toBe(expectedArticle);
    const numDivs = wrapper.find('div');
    expect(numDivs).toHaveLength(3);
  });

  it('sends and returns rating', () => {
    moxios.stubRequest(`/api/articles/${data.slug}/rate/`, {
      status: 201,
      response: {
        amount: 5,
      },
    });

    const result = sendRating('me-and-william');
    expect(result).toBeInstanceOf(Promise);
  });

  it('render comments', () => {
    const wrapper = shallow(<CreateComment />);
    expect(wrapper).toHaveLength(1);
  });
});
