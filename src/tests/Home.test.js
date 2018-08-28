import React from "react";
import Home from "../containers/Home/Home";
import { shallow } from "enzyme";

it("renders right text", () => {
  const wrapper = shallow(<Home />);
  const firsth1 = wrapper.find("h1").first();
  expect(firsth1.text()).toBe('This is home.');
});
