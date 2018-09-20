import axios from 'axios';
import { ALL_NOTIFICATIONS, FETCH_MORE } from './actionTypes';

export const NotifyActions = (results = [], nextPage = '', ActionType) => {
  const readNotifications = results.filter(value => value.read_or_not_read === false);
  const unRead = readNotifications.length;
  return {
    // create an action type for login start
    type: ActionType,
    payload: { results, nextPage, count: unRead },
  };
};

export const Paginate = (results = [{}], nextPage = '', ActionType) => {
  let HideLoadMoreState = false;
  if (nextPage === null) {
    HideLoadMoreState = true;
  }
  const readNotifications = results.filter(value => value.read_or_not_read === false);
  const unRead = readNotifications.length;
  return {
    type: ActionType, payload: results, nextPage, HideLoadMoreState, count: unRead,
  };
};

export const optInForNotifications = () => {
  axios({
    url: 'https://authors-haven-tabs.herokuapp.com/api/user/notifications/opt_in_or_out',
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      const { data } = response;
      const { message } = data;
      let NotifyStatus;
      if (message === 'Opt in status for notifications is now changed to True') {
        NotifyStatus = true;
        localStorage.setItem('opt_in_for_notifications', NotifyStatus);
      } else {
        NotifyStatus = false;
        localStorage.removeItem('opt_in_for_notifications');
      }
    });
};

export const markAsRead = (id) => {
  axios({
    url: `https://authors-haven-tabs.herokuapp.com/api/user/notifications/read/${id}`,
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });
};

export const FetchNotifications = (actionType, urlEndpoint) => {
  return dispatch => {
    axios({
      url: urlEndpoint,
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        switch (actionType) {
          case ALL_NOTIFICATIONS:
            dispatch(
              NotifyActions(
                response.data.results,
                response.data.next,
                actionType,
              ),
            );
            break;

          case FETCH_MORE:
            dispatch(Paginate(response.data.results, response.data.next, actionType));
            break;

          default:
            break;
        }
      });
  };
};

export default FetchNotifications;
