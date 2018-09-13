import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FollowerCard } from '../../components/Profile/FollowerCard';
import { FollowerGrid } from '../../containers/FollowGrid/FollowerGrid';

describe('test follower grid', () => {
  let wrapper;
  let parentWrapper;
  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <FollowerGrid />
      </BrowserRouter>,
    );
    wrapper = parentWrapper.find(FollowerGrid);
  });
  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe('fetchData', () => {
    it('should call getFollowing', () => {
      const spy = jest.spyOn(wrapper.instance(), 'getFollowing');
      wrapper.instance().fetchData();
      expect(spy).toBeCalled();
    });
  });

  describe('getFollowing', () => {
    it('renders without breaking', async () => {
      const dataList = [
        { username: 'usernamex', image: 'imagex' },
        { username: 'usernameq', image: 'imageq' },
      ];
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/users/my/followers/', {
        status: 200,
        response: { dataList },
      });
      const res = await wrapper.instance().getFollowing();
      expect(res.data.dataList).toBe(dataList);
    });
  });

  describe('fetchData', () => {
    it('should call handleResponse', async () => {
      const followers = [
        { username: 'usernamex', email: 'imagex' },
        { username: 'usernameq', email: 'imageq' },
      ];
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/users/my/followers/', {
        status: 200,
        response: { followers },
      });
      const spy = jest.spyOn(parentWrapper.find(FollowerGrid).instance(), 'handleResponse');
      await wrapper.instance().fetchData();
      expect(spy).toBeCalled();
    });
  });

  describe('handleResponse', () => {
    it('handles user data response', () => {
      const list = [
        { username: 'usernamex', email: 'imagex' },
        { username: 'usernameq', email: 'imageq' },
      ];
      wrapper.instance().handleResponse(list);
      expect(wrapper.instance().state.followList).toBe(list);
    });
  });

  describe('test for', () => {
    it('person card component', () => {
      const compWrapper = shallow(
        <BrowserRouter>
          <FollowerGrid />
        </BrowserRouter>,
      );
      const comp = compWrapper.find('FollowerGrid').dive();
      comp.instance().setState({
        followList: [
          { username: 'usernamex', image: 'imagex' },
          { username: 'usernameq', image: 'imageq' },
        ],
      });
      comp.instance().forceUpdate();
      expect(comp.find(FollowerCard)).toHaveLength(2);
    });
  });
});
