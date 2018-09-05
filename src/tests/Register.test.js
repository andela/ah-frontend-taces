import React from "react";
import Register from "../containers/Register/Register";
import { shallow } from "enzyme";

it("renders right text", () => {
  const wrapper = shallow(<Register />);
  const firstdiv = wrapper.find("div").first();
  expect(firstdiv.text()).toBe("Register form here.");
});
