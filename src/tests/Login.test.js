import React from "react";
import Login from "../containers/Login/Login";
import { shallow } from "enzyme";

it("renders right text", () => {
  const wrapper = shallow(<Login />);
  const firstdiv = wrapper.find("div").first();
  expect(firstdiv.text()).toBe("Login form here.");
});
