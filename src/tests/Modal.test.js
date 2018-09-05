import React from "react";
import { shallow } from "enzyme";
import Modal from "../components/Modal/Modal";

describe("<Modal />", () => {
    it("should translate to the top by -100vh if show is false", () => {
        const wrapper = shallow(<Modal show={false} />);
        const modalElement = wrapper.find('div');
        const modalStyle = modalElement.get(0).props.style;
        expect(modalStyle).toHaveProperty("transform", "translateY(-100vh)");
      });

      it("should not translate to the top if show is true", () => {
        const wrapper = shallow(<Modal show={true} />);
        const modalElement = wrapper.find('div');
        const modalStyle = modalElement.get(0).props.style;
        expect(modalStyle).toHaveProperty("transform", "translateY(0)");
      });

});
