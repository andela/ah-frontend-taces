import {
  ALL_NOTIFICATIONS, FETCH_MORE, READ, TOGGLE_MUTE_NOTIFICATIONS,
} from '../actions/actionTypes';

const initialize = {
  notifications: [],
  HideLoadMore: false,
  muteNotifications: false,
};

const notificationReducer = (state = initialize, action) => {
  switch (action.type) {
    case ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.results,
        nextPage: action.payload.nextPage,
        count: action.payload.count,
      };

    case FETCH_MORE:
      return {
        ...state,
        notifications: state.notifications.concat(action.payload),
        nextPage: action.nextPage,
        HideLoadMore: action.HideLoadMoreState,
        count: action.count + state.count,
      };

    case TOGGLE_MUTE_NOTIFICATIONS:
      return {
        ...state,
        muteNotifications: !state.muteNotifications,
      };

    case READ:
      return {
        ...state,
        notifications: state.notifications.concat(action.payload),
      };

    default:
      break;
  }
  return state;
};

export default notificationReducer;
