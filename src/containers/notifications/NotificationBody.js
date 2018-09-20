import React from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';
import classes from '../../CSS/Notifications.css';

export const NotificationBody = (props) => {
  const {
    title, slug, time, author, read, clicked, id,
  } = props;
  return (
    <div className={read ? classes.outer : classes.read}>
      <div className={classes.head}>
        <div className="row">
          <div className="col-sm">
            <small>
              {author}
              {' '}
              published
            </small>
          </div>
          <div className="col-sm">
            <small>
              <Moment fromNow ago>{time}</Moment>
              {' '}
                ago
            </small>
          </div>
          <div className="col-sm" style={read ? { visibility: 'hidden' } : { display: 'block' }}>
            <div className="form-check">
              <input type="checkbox" onChange={() => clicked(id)} className="form-check-input" id="materialUnchecked" />
              <small>Mark as read</small>
            </div>
          </div>
        </div>
      </div>
      <NavLink value={slug} onClick={() => clicked(id)} to={`/articles/${slug}`}>
        <div className="col-sm">
          <center>{title}</center>
        </div>
      </NavLink>
      <br />
    </div>
  );
};

export default NotificationBody;
