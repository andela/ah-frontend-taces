import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'moment-timezone';
import {
  ALL_NOTIFICATIONS, FETCH_MORE,
} from '../../store/actions/actionTypes';
import FetchNotifications, { optInForNotifications, markAsRead } from '../../store/actions/notificationActions';
import NotificationBody from './NotificationBody';
import classes from '../../CSS/Notifications.css';


export class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // holds all states
    };
  }

  markAsRead = (id) => {
    markAsRead(id);
  }

  Pagination = () => {
    const { nextPage, paginateNotifications } = this.props;
    if (nextPage !== null) {
      paginateNotifications(nextPage);
    }
  }

  optInForNotifications = () => {
    optInForNotifications();
  }


  render() {
    const { notification, HideLoadMore } = this.props;
    return (
      <div className={classes.box}>
        <center>
          <a id="muteNotifications" onClick={this.optInForNotifications} href="#">
            {localStorage.getItem('opt_in_for_notifications') ? (
              <div className={classes.mute}>
                <span>Mute Notifications</span>
                <img src="https://png.icons8.com/metro/1600/no-audio.png" alt="" />
              </div>
            )
              : (
                <div className={classes.unmute}>
                  <span>Unmute Notifications</span>
                  <img src="https://png.icons8.com/android/1600/speaker.png" alt="" />
                </div>
              )}
          </a>
        </center>
        { notification.map((value, index) => {
          return (
            <NotificationBody
            key={index}
            title={value.article.title}
            time={value.created}
            slug={value.article.slug}
            author={value.author.username}
            read={value.read_or_not_read}
            clicked={this.markAsRead}
            id={value.id}
            />
          );
        })}
        {HideLoadMore ? <center id="base">No more older notifications.</center> : <center id="base"><a id="paginate" onClick={this.Pagination} href="#base">View older notifications.</a></center>}
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.array,
  paginateNotifications: PropTypes.func,
};

Notification.defaultProps = {
  notification: [{}],
  paginateNotifications: () => {},
};

const mapStateToProps = state => {
  // map state to props
  return {
    notification: state.notifications.notifications,
    nextPage: state.notifications.nextPage,
    HideLoadMore: state.notifications.HideLoadMore,
  };
};

const mapDispatchToProps = dispatch => {
  // map dispatch to props
  return {
    retrieveNotifications: () => dispatch(FetchNotifications(ALL_NOTIFICATIONS, 'https://authors-haven-tabs.herokuapp.com/api/user/notifications/')),
    paginateNotifications: (nextPage) => dispatch(FetchNotifications(FETCH_MORE, nextPage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);
