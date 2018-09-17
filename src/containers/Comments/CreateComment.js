import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ArraySort from 'array-sort';
import classes from '../../CSS/CreateComment.css';
import CommentBody from './CommentBody';

export class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommentsData: [
        { body: 'body', created_at: '12/11/10', author: { userename: 'myUser', image: 'url.com' } },
        { body: 'body', created_at: '12/11/10', author: { userename: 'myUser', image: '' } },
      ],
      LoadingMessage: 'Loading..',
      next: '',
    };
  }

  componentDidMount() {
    const { slug } = this.props;
    axios
      .get(
        `https://authors-haven-tabs.herokuapp.com/api/articles/${slug}/all/comments/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      )
      .then(response => {
        let makeClickable = true;
        if (response.data.results.length === 0 || response.data.next === null) {
          makeClickable = false;
        }
        const sorteData = this.sorter(response.data.results);
        this.setState({
          CommentsData: sorteData, next: response.data.next, makeClickable,
        });
      });
  }

  // load more comments into state
  Pagination = () => {
    const { next, CommentsData } = this.state;

    this.setState({ LoadingComments: true });
    axios
      .get(
        next,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      )
      .then(response => {
        const newCommentData = CommentsData.concat(response.data.results);
        let LoadingMessage;
        if (response.data.next === null) {
          LoadingMessage = `Hurray! We${"'"}ve got you all the comments.`;
        } else {
          LoadingMessage = 'Loading..';
        }
        const sorteData = this.sorter(newCommentData);
        this.setState({
          CommentsData: sorteData,
          next: response.data.next,
          LoadingComments: false,
          LoadingMessage,
        });
      });
  }

  sorter = (arr) => ArraySort(arr, 'created_at', { reverse: true });

  // takes comment body and stores them in state by name
  eventListener = event => this.setState({ [event.target.name]: event.target.value });

  // take form data from states, and creates a new commment
  SubmitComment = event => {
    event.preventDefault();
    const { body } = this.state;
    const { slug } = this.props;
    const data = { body };
    this.setState({ errorMsg: '' });
    axios
      .post(
        `https://authors-haven-tabs.herokuapp.com/api/articles/${slug}/comment`,
        data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((response) => {
        const { CommentsData } = this.state;
        CommentsData.splice(0, 0, response.data.comment);
        this.setState({ body: '' });
      });
  };

  render() {
    const {
      CommentsData, body, LoadingComments, LoadingMessage, errorMsg, makeClickable,
    } = this.state;
    return (
      <div className={classes.detailBox}>
        <div className={classes.titleBox}>
          <h5>Comments</h5>
        </div>
        <div className={classes.actionBox}>
          <ul className={classes.commentList}>
            {CommentsData.map((commentData, index) => {
              const date = commentData.created_at;
              const { author } = commentData;
              let { image } = author;
              const { username } = author;

              if (image === '') {
                image = 'https://cdn0.iconfinder.com/data/icons/avatar-15/512/ninja-512.png';
              }

              return (
                <CommentBody
                picture={image}
                commentBody={commentData.body}
                CommentDate={date}
                key={index}
                commentersName={username}
                />
              );
            })}
            <li id="lastComment">
              <center>
                {LoadingComments
                  ? (
                    <h6 className={classes.loading}>{LoadingMessage}</h6>
                  )
                  : (
                    <NavLink id="nav" className={classes.loadMore} onClick={makeClickable ? this.Pagination : null} to="#"><h6>{makeClickable ? 'Click to view more comments.' : 'Got something in mind? Add a comment.'}</h6></NavLink>
                  )
                }
              </center>
            </li>
          </ul>
          <form onSubmit={this.SubmitComment}>
            <center><small className={classes.errors}>{errorMsg}</small></center>
            <div className="input-group mb-3">
              <input value={body} onChange={this.eventListener} name="body" className={classes.comment_input} type="text" placeholder="Your Comment." required />
              <div className="input-group-append">
                <button className={`classes.comment_button${' btn-dark'}`} type="submit">Comment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateComment.propTypes = {
  slug: PropTypes.string,
};

CreateComment.defaultProps = {
  slug: '',
};

export default CreateComment;
