import React from 'react';
import { mount } from 'enzyme';
import { Register } from '../../containers/Register/Register';
import Spinner from '../../components/Spinner/Spinner';

describe('<Register />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Register />);
  });

  it('it should update username state on change', () => {
    const usernameInput = wrapper
      .find('.form-group')
      .find('input')
      .at(0);
    usernameInput.instance().value = 'testusername';
    usernameInput.simulate('change');
    expect(wrapper.state().touched.username).toBeTruthy();
    expect(wrapper.state().user.username).toEqual('testusername');
  });

  it('it should update user email state on change', () => {
    const emailInput = wrapper
      .find('.form-group')
      .find('input')
      .at(1);
    emailInput.instance().value = 'testuseremail';
    emailInput.simulate('change');
    expect(wrapper.state().touched.email).toBeTruthy();
    expect(wrapper.state().user.email).toEqual('testuseremail');
  });

  it('it should update username state on change', () => {
    const passwordInput = wrapper
      .find('.form-group')
      .find('input')
      .at(2);
    passwordInput.instance().value = 'testuserpassword';
    passwordInput.simulate('change');
    expect(wrapper.state().touched.password).toBeTruthy();
    expect(wrapper.state().user.password).toEqual('testuserpassword');
  });

  it('validationHandler on username input when username is less than 6 characters long', () => {
    const usernameInput = wrapper
      .find('.form-group')
      .find('input')
      .at(0);
    usernameInput.instance().value = 'test';
    usernameInput.simulate('change');

    const validationInstance = wrapper.instance().validationHandler('username');
    expect(validationInstance).toBeTruthy();
    expect(validationInstance.type).toBe('span');
    expect(validationInstance.props.children).toEqual(
      'Username needs to be at least 6 characters long.'
    );
  });

  it('validationHandler on email input when email is in wrong format', () => {
    const emailInput = wrapper
      .find('.form-group')
      .find('input')
      .at(1);
    emailInput.instance().value = 'test';
    emailInput.simulate('change');

    const validationInstance = wrapper.instance().validationHandler('email');
    expect(validationInstance).toBeTruthy();
    expect(validationInstance.type).toBe('span');
    expect(validationInstance.props.children).toEqual('Enter a valid email format.');
  });

  it('validationHandler on password input when password is too short', () => {
    const passwordInput = wrapper
      .find('.form-group')
      .find('input')
      .at(2);
    passwordInput.instance().value = 'test';
    passwordInput.simulate('change');

    const validationInstance = wrapper.instance().validationHandler('password');
    expect(validationInstance).toBeTruthy();
    expect(validationInstance.type).toBe('span');
    expect(validationInstance.props.children).toEqual(
      'Password needs to be at least 8 characters long.'
    );
  });

  it('validationHandler on passoword input when password is not aphanumeric', () => {
    const passwordInput = wrapper
      .find('.form-group')
      .find('input')
      .at(2);
    passwordInput.instance().value = 'testuserpassword';
    passwordInput.simulate('change');

    const validationInstance = wrapper.instance().validationHandler('password');
    expect(validationInstance).toBeTruthy();
    expect(validationInstance.type).toBe('span');
    expect(validationInstance.props.children).toEqual(
      'Please include at least a number and any of these symbols in your password @,#,!,$,%,&,*,(,)'
    );
  });

  it('validationHandler returns nothing when no errors occur', () => {
    const validationInstance = wrapper.instance().validationHandler('');
    expect(validationInstance).toBeFalsy();
  });

  it('should show spinner on loading true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
    const submitButton = wrapper.find('input[type="submit"]').props();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should not show spinner on loading false', () => {
    wrapper.setProps({ loading: false });
    expect(wrapper.find(Spinner)).toHaveLength(0);
    const submitButton = wrapper.find('input[type="submit"]').props();
    expect(submitButton.disabled).toBeTruthy();
  });

  it('onregistrationsubmit', () => {
    wrapper.instance().onRegistrationSubmitEventHandler = jest.fn();
    wrapper.update();
    wrapper.find('form').simulate('submit');
    expect(wrapper.instance().onRegistrationSubmitEventHandler).toHaveBeenCalled();
  });
});
