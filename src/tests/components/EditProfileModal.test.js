import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import jest from 'jest-mock';
import { EditProfileModal } from '../../components/Profile/EditProfileModal';

describe('test edit profile modal', () => {
  const updateChildData = jest.fn();
  const wrapper = shallow(<EditProfileModal updateChildData={updateChildData} />);
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('Update Handler', () => {
    it('mocks data update handler', () => {
      const spy = jest.spyOn(wrapper.instance(), 'dataUpdateHandler');
      wrapper.instance().forceUpdate();

      wrapper.find('.modal-footer button.btn-dark').simulate('click', { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  it('mocks file selected handler', () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    const spy = jest.spyOn(wrapper.instance(), 'fileSelectedHandler');
    wrapper.instance().forceUpdate();

    const newImage = wrapper.find('input[name="newImage"]');
    newImage.simulate('change', { target: { files: [file], name: 'newImage' } });
    expect(spy).toHaveBeenCalled();
  });

  it('handleInput', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().forceUpdate();

    const newBio = wrapper.find('textarea[name="newBio"]');
    newBio.simulate('change', { target: { value: 'My bio is something else', name: 'newBio' } });
    expect(spy).toHaveBeenCalled();
  });
});
