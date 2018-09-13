import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';
import { NavLink } from 'react-router-dom';
import classes from '../../CSS/CreateComment.css';

export const CommentBody = (props) => {
  const {
    commentBody, CommentDate, picture, commentersName,
  } = props;
  // const dateToFormat = '1976-04-19T12:59-0500';
  return (
    <li>
      <NavLink to="profile">
        <div className={classes.commenterImage}>
          <img src={picture} alt="" />
        </div>
      </NavLink>
      <div className={classes.commentText}>
        <div className={classes.commentCover}>
          <p className="">
            <small>
              <NavLink className={classes.CommentersName} to="profile">
                {commentersName}
                {' '}
              </NavLink>
            </small>
            <br />
            { commentBody }
            <br />
            <span className={classes.sub_text}>
              Commented
              &nbsp;
              <Moment fromNow ago>{CommentDate}</Moment>
              &nbsp;
              ago.
            </span>
          </p>
        </div>
      </div>
    </li>
  );
};


// validate props
CommentBody.propTypes = {
  commentBody: PropTypes.string,
  CommentDate: PropTypes.string,
  picture: PropTypes.string,
  commentersName: PropTypes.string,
};

CommentBody.defaultProps = {
  commentBody: '',
  CommentDate: '',
  picture: '',
  commentersName: '',
};

export default CommentBody;
