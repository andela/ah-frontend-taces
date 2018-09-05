import React from "react";
import { shallow } from "enzyme";
import Popular from "../components/Popular/Popular";

describe("<Popular />", () => {
  it("should render three images", () => {
    const wrapper = shallow(<Popular />);
    expect(wrapper.find("img")).toHaveLength(3);
  });
});
