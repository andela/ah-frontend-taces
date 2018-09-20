import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'moment-timezone';
import FetchNotifications from '../../store/actions/notificationActions';
import {
  ALL_NOTIFICATIONS,
} from '../../store/actions/actionTypes';
import classes from '../../CSS/Notifications.css';


export class NotificationIcon extends Component {
  componentDidMount() {
    const { retrieveNotifications } = this.props;
    retrieveNotifications();
  }

  render() {
    const { notificationCount } = this.props;
    return (
      <div>
        <div className={classes.notificationOuter}>
          <img src="https://png.icons8.com/ios-glyphs/1600/bell.png" alt="" />
        </div>
        <div className={classes.notificationsBadge}>
          <span className="badge badge-secondary">{notificationCount}</span>
        </div>
      </div>
    );
  }
}

NotificationIcon.propTypes = {
  retrieveNotifications: PropTypes.func,
};

NotificationIcon.defaultProps = {
  retrieveNotifications: () => {},
};


const mapStateToProps = state => {
  // map state to props
  return {
    notificationCount: state.notifications.count,
  };
};

const mapDispatchToProps = dispatch => {
  // map dispatch to props
  return {
    retrieveNotifications: () => dispatch(FetchNotifications(ALL_NOTIFICATIONS, 'https://authors-haven-tabs.herokuapp.com/api/user/notifications/')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationIcon);
