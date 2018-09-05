import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import CreateArticle from '../../components/Articles/createArticle';

describe('<CreateArticle />', () => {
  it('calls submitArticle', () => {
    moxios.install();
    moxios.stubRequest('/api/articles', {
      status: 201,
      response: {},
    });

    const props = {
      history: {
        push: () => {},
      },
    };

    const wrapper = mount(<CreateArticle {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'submitArticle');
    wrapper.instance().forceUpdate();
    wrapper.find('form[name="createArticle"]').simulate('submit');
    expect(spy).toHaveBeenCalled();
    moxios.uninstall();
  });

  it('calls eventListener', () => {
    const wrapper = mount(<CreateArticle />);
    const spy = jest.spyOn(wrapper.instance(), 'eventListener');
    wrapper.instance().forceUpdate();
    const title = wrapper.find('input[name="title"]');
    title.simulate('change', { target: { value: 'some name', name: 'title' } });
    expect(spy).toHaveBeenCalled();
  });

  it('calls upload Image', () => {

    moxios.install();
    moxios.stubRequest('/v1_1/dqhowauvv/image/upload', {
      status: 201,
      response: {},
    });

    const wrapper = mount(<CreateArticle />);
    const spy = jest.spyOn(wrapper.instance(), 'uploadImage');
    wrapper.instance().forceUpdate();
    const image = wrapper.find('input[type="file"]');
    image.simulate('change', {});
    expect(spy).toHaveBeenCalled();
    moxios.uninstall();
  });

  it('calls addTags', () => {
    const wrapper = mount(<CreateArticle />);
    const title = wrapper.find('input[name="tags"]');
    const spy = jest.spyOn(wrapper.instance(), 'addTags');
    wrapper.instance().forceUpdate();
    title.simulate('change', { target: { value: 'some,name', name: 'tags' } });
    expect(spy).toHaveBeenCalled();
  });
});
