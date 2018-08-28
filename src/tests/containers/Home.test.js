import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../containers/Home/Home';
import Header from '../../containers/Header/Header';
import Popular from '../../components/Popular/Popular';
import Recent from '../../components/Recent/Recent';
import Footer from '../../components/Footer/Footer';

describe('<Home />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home showLandingPage={true} toggleLandingPageHandler={() => {}} />);
  });

  it('should render the header', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should render the footer', () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('should render the recent articles component', () => {
    expect(wrapper.find(Recent)).toHaveLength(1);
  });

  it('should render the popular articles component', () => {
    expect(wrapper.find(Popular)).toHaveLength(1);
  });
});
