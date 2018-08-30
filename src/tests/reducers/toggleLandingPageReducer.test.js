import reducer from '../../store/reducers/toggleLandingPageReducer';
import { TOGGLE_LANDING_PAGE } from '../../store/actions/actionTypes';

describe('toggleLandingPageReducer', () => {
  const initialState = {
    showLanding: true,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should change the state of showLandingPage to false', () => {
    const action = { type: TOGGLE_LANDING_PAGE };
    const newState = reducer(initialState, action);
    expect(newState.showLanding).toEqual(false);
  });
});
