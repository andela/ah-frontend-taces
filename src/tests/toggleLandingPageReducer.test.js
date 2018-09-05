import reducer from '../store/reducers/toggleLandingPageReducer';
import {TOGGLE_LANDING_PAGE} from '../store/actions/actionTypes';

describe('toggleLandingPageReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      showLanding: true
    });
  });

  it('should change the state of showLandingPage to false', () => {
    expect(
      reducer(
        {
          showLanding: true
        },
        { type: TOGGLE_LANDING_PAGE }
      )
    ).toEqual({
      showLanding: false
    });
  });
});
