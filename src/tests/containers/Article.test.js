import moxios from 'moxios';
import React from 'react';
import { shallow } from 'enzyme';
import { Article } from '../../containers/Articles/Article';

import { fetchPost } from '../../containers/lib';

describe('<Article />', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('fecthes and returns an article', async () => {
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
});
