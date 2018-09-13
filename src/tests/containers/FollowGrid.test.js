import { shallow, mount } from 'enzyme';
import moxios from 'moxios';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PersonCard } from '../../components/Profile/PersonCard';
import { FollowGrid } from '../../containers/FollowGrid/FollowGrid';

describe('test follow grid', () => {
  let wrapper;
  let parentWrapper;
  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <FollowGrid />
      </BrowserRouter>,
    );
    wrapper = parentWrapper.find(FollowGrid);
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
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/users/my/following/', {
        status: 200,
        response: { dataList },
      });
      const res = await wrapper.instance().getFollowing();
      expect(res.data.dataList).toBe(dataList);
    });
  });

  describe('fetchData', () => {
    it('should call handleResponse', async () => {
      const following = [
        { username: 'usernamex', email: 'imagex' },
        { username: 'usernameq', email: 'imageq' },
      ];
      moxios.stubRequest('https://authors-haven-tabs.herokuapp.com/api/users/my/following/', {
        status: 200,
        response: { following },
      });
      const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
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
          <FollowGrid />
        </BrowserRouter>,
      );
      const comp = compWrapper.find('FollowGrid').dive();
      comp.instance().setState({
        followList: [
          { username: 'usernamex', image: 'imagex' },
          { username: 'usernameq', image: 'imageq' },
        ],
      });
      comp.instance().forceUpdate();
      expect(comp.find(PersonCard)).toHaveLength(2);
    });
  });
});
