import React from 'react';
import { shallow } from 'enzyme';
import { Error404Handler } from '../../containers/ErrorHandlers/Error404Handler/Error404Handler';
import Error404 from '../../components/Errors/Error403/Error403';

describe('<Error403Handler />', () => {
  let wrapper;
  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFidWxvam9zaHVhMUBvdXRsb29rLmNvbSIsImV4cCI6MTUzNjUxMTA4OX0.L20q6Z_So0AUgp-cbybzJNU1pxnZk7I6HjsbgPwqwa0');
    wrapper = shallow(<Error404Handler showLandingPage toggleLandingPageHandler={() => {}} />);
  });

  it('should render the Error404 component only for bad requests', () => {
    expect(wrapper.find(Error404)).toHaveLength(0);
  });
});
