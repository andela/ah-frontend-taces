import React from "react";
import Header from "../components/Header/Header";
import { shallow } from "enzyme";

it("renders right text", () => {
  const wrapper = shallow(<Header />);
  const firstNavLink = wrapper.find("NavLink").first();
  const secondNavLink = wrapper.find('NavLink');
  expect(firstNavLink.prop('children')).toBe('Home');
  expect(secondNavLink.last().prop('children')).toBe('Login');
});
