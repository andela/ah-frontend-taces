import React from 'react';
import { mount } from 'enzyme';
import ReportArticleComponent from '../../components/Overlays/ReportArticleOverlay';

describe('ReportArticleComponent', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ReportArticleComponent />);
  });

  it('calls handleReportSubmission when form is submitted', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleReportSubmission');
    const radioButton = wrapper.find('input[value="Spam"]');
    radioButton.simulate('change');
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleCancel when cancel is clicked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleCancel');
    const cancel = wrapper.find('#cancelButton');
    wrapper.instance().forceUpdate();
    cancel.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
