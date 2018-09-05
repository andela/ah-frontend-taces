import React from "react";
import { Home } from '../containers/Home/Home';
import Header from "../components/Header/Header";
import Popular from "../components/Popular/Popular";
import Recent from "../components/Recent/Recent";
import Footer from "../components/Footer/Footer";
import { shallow } from "enzyme";

describe("<Home />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home showLandingPage = { true } toggleLandingPageHandler = {()=> {}} />);
  });

  it("should render the header", () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it("should render the footer", () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it("should render the recent articles component", () => {
    expect(wrapper.find(Recent)).toHaveLength(1);
  });

  it("should render the popular articles component", () => {
    expect(wrapper.find(Popular)).toHaveLength(1);
  });

  it("should change the show props to false", () => {
      wrapper.instance().hideLandingPage()  
  });
});
