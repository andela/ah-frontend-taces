import React from "react";
import { shallow } from "enzyme";
import Recent from "../components/Recent/Recent";

describe("<Recent />", () => {
  it("should render six images", () => {
    const wrapper = shallow(<Recent />);
    expect(wrapper.find("img")).toHaveLength(6);
  });
});
