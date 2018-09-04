import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios from 'moxios';
import { PasswordReset } from '../../containers/passwordReset/passwordReset';
import { PasswordFillInForm } from '../../containers/passwordReset/PasswordFillInForm';

it('calls eventListener', () => {
  const passwordResetData = 'Opps! Email not found.';

  moxios.stubRequest('/api/users/password/forgot/', {
    status: 200,
    response: passwordResetData,
  });

  const wrapper = mount(<PasswordReset />);
  const spy = jest.spyOn(wrapper.instance(), 'eventListener');
  const spy2 = jest.spyOn(wrapper.instance(), 'passwordResetHttpCall');
  wrapper.instance().forceUpdate();
  const title = wrapper.find('input[name="passReset"]');
  title.simulate('change', { target: { value: 'some@email.com', name: 'passReset' } });
  expect(spy).toHaveBeenCalled();
  wrapper.find('form').simulate('submit');
  expect(spy2).toHaveBeenCalled();
});

it('test the password reset forms', () => {
  const props = {
    loadingPassReset: true,
  };
  const wrapper = shallow(<PasswordFillInForm {...props} />);
  const modalElement = wrapper.find('div');
  expect(modalElement).toHaveLength(3);
});

it('test if null is rendered', () => {
  const props = {
    loadingPassReset: false,
  };
  const wrapper = shallow(<PasswordFillInForm {...props} />);
  const modalElement = wrapper.find('div');
  expect(modalElement).toHaveLength(3);
});
