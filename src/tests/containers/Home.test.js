import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../containers/Home/Home';
import Popular from '../../components/Popular/Popular';
import Recent from '../../components/Recent/Recent';

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    window.history.pushState({}, 'Test Title', '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFidWxvam9zaHVhMUBvdXRsb29rLmNvbSIsImV4cCI6MTUzNjUxMTA4OX0.L20q6Z_So0AUgp-cbybzJNU1pxnZk7I6HjsbgPwqwa0');
    wrapper = shallow(<Home showLandingPage={true} toggleLandingPageHandler={() => {}} />);
  });

  it('should render the recent articles component', () => {
    expect(wrapper.find(Recent)).toHaveLength(1);
  });

  it('should render the popular articles component', () => {
    expect(wrapper.find(Popular)).toHaveLength(1);
  });

});
