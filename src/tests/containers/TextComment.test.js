import React from 'react';
import { mount } from 'enzyme';
import { TextComment } from '../../containers/Articles/TextComment/TextComment';

describe('<TextComment />', () => {
  it('it should update body to the state', () => {
    const wrapper = mount(<TextComment />);
    const inputTextArea = wrapper
      .find('.form-group')
      .find('input')
      .at(0);
    inputTextArea.instance().value = 'comment body';
    inputTextArea.simulate('change');
    expect(wrapper.state().body).toEqual('comment body');
  });

  it('should successfully redirect', () => {
    const historyMock = { push: jest.fn() };
    const wrapper = mount(<TextComment history={historyMock} />);
    const detailsButton = wrapper.find('button').at(0);
    detailsButton.simulate('click');
    expect(historyMock.push.mock.calls[0]).toEqual([{ pathname: '/articles//text-comments' }]);
  });

  it('should submit successfully', () => {
    const wrapper = mount(<TextComment />);
    wrapper.instance().onsubmitHandler = jest.fn();
    const inputForm = wrapper.find('form');
    inputForm.simulate('submit', { preventDefault: () => {} });
    expect(wrapper.instance().onsubmitHandler).toHaveBeenCalled();
  });
});
