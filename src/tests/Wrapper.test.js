import React from "react";
import Wrapper from "../hoc/Wrapper/Wrapper";
import { shallow } from "enzyme";

it("renders right text", () => {
  const wrapper = shallow(<Wrapper />);
  expect(wrapper.type()).toBe('div');
});
