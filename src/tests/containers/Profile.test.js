import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Profile } from '../../containers/Profile/Profile';
import { ProfileListItem } from '../../components/Profile/ProfileListItem';

describe('tests profile container', () => {
  let wrapper;
  let parentWrapper;
  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );
    wrapper = parentWrapper.find(Profile);
  });
  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  it('renders without breaking', async () => {
    const user = { username: 'username', image: 'sssssss', bio: 'user bio' };
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/user/', {
      status: 200,
      response: { user },
    });
    const res = await wrapper.instance().getUser();
    expect(res.data.user).toBe(user);
  });

  describe('handleResponse', () => {
    it('handles user data response', () => {
      const user = { username: 'username', image: 'sssssss', bio: 'user bio' };
      wrapper.instance().handleResponse('user', user);
      expect(wrapper.instance().state.user).toBe(user);
    });
  });

  describe('getInitialUserData', () => {
    it('should call getUser ', () => {
      const spy = jest.spyOn(wrapper.instance(), 'getUser');
      wrapper.instance().getInitialUserData();
      expect(spy).toBeCalled();
    });
  });

  describe('getInitialUserData', () => {
    it('should call handle response', async () => {
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/user/', {
        status: 200,
        response: { username: 'username', image: 'sssssss', bio: 'user bio' },
      });
      const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
      await wrapper.instance().getInitialUserData();
      expect(spy).toBeCalled();
    });
  });

  describe('updateChildData', () => {
    it('should update user data sate', () => {
      const oldUser = { username: 'old username', image: 'old image', bio: 'old user bio' };
      wrapper.instance().setState({
        user: oldUser,
      });
      const newUser = { username: 'new username', image: 'new image', bio: 'new user bio' };
      wrapper.instance().updateChildData(newUser);
      expect(wrapper.instance().state.user).toBe(newUser);
    });
  });

  it('returns a list or articles', async () => {
    const articles = {
      articles: [
        {
          title: 'title',
          image: 'article image',
          description: 'article description',
          likes: '20',
        },
      ],
    };
    moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/all/', {
      status: 200,
      response: { articles },
    });
    const res = await wrapper.instance().getArticles();
    expect(res.data.articles).toBe(articles);
  });

  describe('getInitialArticleData', () => {
    const articles = {
      articles: [
        {
          title: 'title',
          image: 'article image',
          description: 'article description',
          likes: '20',
        },
      ],
    };
    it('should call handle response', async () => {
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/articles/all/', {
        status: 200,
        response: { results: { articles } },
      });
      const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
      await wrapper.instance().getInitialArticleData();
      expect(spy).toBeCalled();
    });
  });

  it('testing component', () => {
    const compWrapper = shallow(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );
    const comp = compWrapper.find('Profile').dive();
    comp.instance().setState({
      articles: [
        {
          title: 'title',
          image: 'image',
          description: 'descriptionXXX',
          likes: '1',
        },
      ],
    });
    comp.instance().forceUpdate();
    expect(comp.find(ProfileListItem)).toHaveLength(1);
  });

  it('mocks update info', () => {
    const data = { username: 'phillip', image: 'someimage.jpg', bio: 'I love football' };
    wrapper.instance().updateChildData(data);
  });
});
