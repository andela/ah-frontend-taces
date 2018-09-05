import reducer from "../store/reducers/toggleModalReducer";
import {START_LOGIN, START_REGISTRATION, CLOSE_MODAL} from "../store/actions/actionTypes";

describe("toggleLandingPageReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      showModal: false,
      isLogin: true
    });
  });

  it("should change the state of showModal to true when login starts", () => {
    expect(
      reducer(
        {
          showModal: true,
          isLogin: true
        },
        { type: START_LOGIN }
      )
    ).toEqual({
      showModal: true,
      isLogin: true
    });
  });

  it("should change the state of isLogin to false", () => {
    expect(
      reducer(
        {
          showModal: true,
          isLogin: false
        },
        { type: START_REGISTRATION }
      )
    ).toEqual({
      showModal: true,
      isLogin: false
    });
  });

  it("should change the state of showModal to false when close modal", () => {
    expect(
      reducer(
        {
          showModal: false,
          isLogin: true
        },
        { type: CLOSE_MODAL }
      )
    ).toEqual({
      showModal: false,
      isLogin: true
    });
  });
});
