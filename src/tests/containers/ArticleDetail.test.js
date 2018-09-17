import moxios from 'moxios';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { ArticleDetail } from '../../containers/Articles/ArticleDetail/ArticleDetail';

import { sendRating } from '../../containers/lib';

import { CreateComment } from '../../containers/Comments/CreateComment';

describe('displaying article by slug ', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const data = {
    results: {
      count: 1,
      next: null,
      previous: null,
      articles: [{
        slug: 'me-and-william',
        title: 'me and william',
        description: 'Verizon keeps trying to stop wireless workers from organizing. Instead their union is expanding.',
        body: 'My name is William and am a graduate software Engineer who has been volunteering to develop systems ',
        created_at: '2018-09-08T13:54:48.198104Z',
        updated_at: '2018-09-11T15:47:59.090374Z',
        author: {
          username: 'deriwilliams',
          email: 'william.sserubiri@andela.com',
          bio: '',
          image: '',
        },
        favorited: false,
        favoritesCount: 0,
        likesCount: 1,
        dislikesCount: 0,
        tags: [
          'books',
          'pipelines',
          'poetry',
        ],
        image: 'https://images.unsplash.com/photo-1527779924457-aec8bd402625?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=374c205ba7b271e5b04a9da4debc113a&auto=format&fit=crop&w=1987&q=80',
        rating: null,
      }],
    },
  };

  it('should render without breaking', async () => {
    const props = {
      match: {
        params: {
          slug: 'slug',
        },
      },
    };

    const wrapper = mount(<ArticleDetail {...props} />);
    wrapper.setProps({
      match: {
        params: {
          slug: 'slug',
        },
      },
    });

    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/search?slug=me-and-william', {
      status: 200,
      response: data,
    });

    const response = await wrapper.instance().fetchArticle('me-and-william');
    expect(response.data).toBe(data);
  });

  it('should call handle response', async (done) => {
    const props = {
      match: {
        params: {
          slug: 'me-and-william',
        },
      },
    };
    const wrapper = mount(<ArticleDetail {...props} />);
    wrapper.setProps({
      match: {
        params: {
          slug: 'me-and-william',
        },
      },
    });
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/search?slug=me-and-william', {
      status: 200,
      response: data,
    });
    const { match } = props;

    const spy = jest.spyOn(wrapper.instance(), 'fetchArticle');
    await wrapper.instance().renderArticles(match.params.slug);
    expect(spy).toBeCalled();
    done();
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

  it('return one minute for any short article', async () => {
    const props = {
      match: {
        params: {
          slug: 'slug',
        },
      },
    };

    const wrapper = mount(<ArticleDetail {...props} />);
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/search?slug=me-and-william', {
      status: 200,
      response: data,
    });

    const timeTaken = await wrapper.instance().readTime();
    expect(timeTaken).toBe(1);
  });

  it('render comments', () => {
    const wrapper = shallow(<CreateComment />);
    expect(wrapper).toHaveLength(1);
  });
});
