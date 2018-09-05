import React from "react";
import Header from "../components/Header/Header";
import { shallow } from "enzyme";

describe("<Header />", () => {
  it("should render two <p> html elements", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("nav")).toHaveLength(1);
  });
});
