import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import moxios from 'moxios';
import { FacebookLoginComponent } from '../../components/SocialLogin/FacebookLogin';

describe('FacebookComponent', () => {
  const MAKEAUTHENTIC = jest.fn();
  const CLOSE_MODAL_ACTION = jest.fn();

  const fbResponse = {
    accessToken: 'sometoken',
    picture: {
      data: {
        url: 'image.png',
      },
    },
  };

  const data = {
    user: {
      token: 'shbd',
      username: 'testUsername',
      email: 'email@email.com',
    },
  };

  beforeEach(()=>{

    moxios.stubRequest('/api/users/fbauth/', {
      status: 400,
      response: data,
    });

  });

const wrapper = shallow(
  <FacebookLoginComponent
    MAKEAUTHENTIC={MAKEAUTHENTIC}
    CLOSE_MODAL_ACTION={CLOSE_MODAL_ACTION}
  />,
);

  it('renders FacebookLoginComponent component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('calls responseFacebook', async () => {
    await wrapper.instance().responseFacebook(fbResponse);
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
      wrapper.instance().handleResponse(response, fbResponse);
      expect(localStorage.getItem('token')).toBe('shbd');
    });
  });
});
