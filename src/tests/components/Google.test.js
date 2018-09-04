import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import { GoogleLoginComponent } from '../../components/SocialLogin/GoogleLogin';

describe('GoogleComponent', () => {
  const MAKEAUTHENTIC = jest.fn();
  const CLOSE_MODAL_ACTION = jest.fn();

  const gGResponse = {
    tokenId: 'sometoken',
    profileObj: {
      imageUrl: 'image.png',
    },
  };

  const data = {
    user: {
      token: 'shbd',
      username: 'testUsername',
      email: 'email@email.com',
    },
  };

  beforeEach(() => {
    moxios.stubRequest('/api/users/googleauth/', {
      status: 400,
      response: data,
    });
  });

  const wrapper = shallow(
    <GoogleLoginComponent
      MAKEAUTHENTIC={MAKEAUTHENTIC}
      CLOSE_MODAL_ACTION={CLOSE_MODAL_ACTION}
    />,
  );

  it('renders GoogleLoginComponent component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('calls responseGoogle', async () => {
    await wrapper.instance().responseGoogle(gGResponse);
    const spy = jest.spyOn(wrapper.instance(), 'handleResponse');
    wrapper.instance().forceUpdate();
    setTimeout(() => { expect(spy).toHaveBeenCalled(); }, 100);
  });


  describe('handleResponse', () => {
    it('should set localstorage items on getting an API response', () => {
      const response = {
        data: {
          user: {
            token: 'shbd',
            username: 'testUsername',
            email: 'email@email.com',
          },
        },
      };
      wrapper.instance().handleResponse(response, gGResponse);
      expect(localStorage.getItem('token')).toBe('shbd');
    });
  });
});
