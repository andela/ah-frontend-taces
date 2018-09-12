import React from 'react';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import { CommentBody } from '../../containers/Comments/CommentBody';
import { CreateComment } from '../../containers/Comments/CreateComment';

it('<CommentBody />', () => {
  const wrapper = shallow(<CommentBody />);
  const modalElement = wrapper.find('div');
  expect(modalElement).toHaveLength(3);
});

describe('tests for comments', () => {
  let wrapper;
  const CommentData = [
    { body: 'body', created_at: '12/11/10', author: { userename: 'myUser', image: 'url.com' } },
    { body: 'body', created_at: '12/11/10', author: { userename: 'myUser', image: 'url.com' } },
  ];
  const createSpy = (toSpy) => jest.spyOn(wrapper.instance(), toSpy);

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest('/api/articles/someslug/all/comments/', {
      status: 400,
      response: CommentData,
    });
  });
  afterEach(() => moxios.uninstall());

  it('<CreateComment />', () => {
    const props = {
      slug: 'someSlug',
    };

    wrapper = shallow(<CreateComment {...props} />);
    const modalElement = wrapper.find('div');
    expect(modalElement).toHaveLength(5);
  });

  it('<CreateComment /> with no profile picture', () => {
    const props = {
      slug: 'someSlug',
    };

    wrapper = shallow(<CreateComment {...props} />);
    const modalElement = wrapper.find('div');
    expect(modalElement).toHaveLength(5);
  });

  it('should call event listener', () => {
    const eventListener = createSpy('eventListener');
    wrapper.instance().forceUpdate();
    const comment = wrapper.find('input[name="body"]');
    expect(comment).toHaveLength(1);
    comment.simulate('change', { target: { value: 'some comment', name: 'body' } });
    expect(eventListener).toHaveBeenCalled();
  });

  it('should call event SubmitComment function', () => {
    const eventListener = createSpy('SubmitComment');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(eventListener).toHaveBeenCalled();
  });

  it('should call event Pagination function', () => {
    const eventListener = createSpy('Pagination');
    wrapper.instance().forceUpdate();
    wrapper.find('#nav').simulate('click', { preventDefault: () => {} });
    expect(eventListener).toHaveBeenCalled();
  });
});
