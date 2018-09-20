import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'proptypes';
import classes from '../../../CSS/TextComment.css';
import { postTextComment } from '../../../store/actions/textCommentsActions';

export class TextComment extends Component {
state = {

}

accessTextCommentDetail = () => {
  const { history, articleSlug } = this.props;
  history.push({ pathname: `/articles/${articleSlug}/text-comments` });
}

onChangeListener = (event) => {
  this.setState({ body: event.target.value });
}

onsubmitHandler = event => {
  event.preventDefault();
  const { selected, articleSlug, onPostTextComment } = this.props;
  const { body } = this.state;
  const data = { selected, body };
  onPostTextComment(articleSlug, data);
}

render() {
  const { selected, loading } = this.props;
  return (
    <div>
      <button
      className={classes.Button}
      onClick={() => this.accessTextCommentDetail()}
      >
VIEW ALL RESPONSES
      </button>
      <hr />
      <p className={classes.info}>
Commenting on &apos;
        { selected }
&apos;

      </p>
      <form onSubmit={event => this.onsubmitHandler(event)}>
        <div className="form-group">
          <input className="form-control no-border" type="textarea" onChange={this.onChangeListener} required />
        </div>
        <button className="btn btn-dark" type="submit" disabled={loading}>Comment</button>
      </form>
    </div>);
}
}

TextComment.propTypes = {
  selected: PropTypes.string,
  articleSlug: PropTypes.string,
  history: PropTypes.object,
  onPostTextComment: PropTypes.func,
  loading: PropTypes.bool,
};

TextComment.defaultProps = {
  selected: '',
  articleSlug: '',
  history: {},
  onPostTextComment: () => {},
  loading: false,
};

const mapStateToProps = state => {
  return {
    loading: state.articleTextComment.loading,
  };
};

const mapDisptachToProps = dispatch => {
  return {
    onPostTextComment: (slug, data) => dispatch(postTextComment(slug, data)),
  };
};


export default connect(mapStateToProps, mapDisptachToProps)(withRouter(TextComment));
