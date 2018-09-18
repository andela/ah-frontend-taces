import React from 'react';
import { shallow } from 'enzyme';
import { Error403Handler } from '../../containers/ErrorHandlers/Error403Handler/Error403Handler';
import Error403 from '../../components/Errors/Error403/Error403';

describe('<Error403Handler />', () => {
  let wrapper;
  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFidWxvam9zaHVhMUBvdXRsb29rLmNvbSIsImV4cCI6MTUzNjUxMTA4OX0.L20q6Z_So0AUgp-cbybzJNU1pxnZk7I6HjsbgPwqwa0');
    wrapper = shallow(<Error403Handler showLandingPage toggleLandingPageHandler={() => {}} />);
  });

  it('should render the error 403 component', () => {
    expect(wrapper.find(Error403)).toHaveLength(1);
  });
});
