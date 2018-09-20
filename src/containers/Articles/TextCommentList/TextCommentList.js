import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
import { fetchTextComments } from '../../../store/actions/textCommentsActions';
import Spinner from '../../../components/Spinner/Spinner';

export class TextCommentList extends Component {
  componentDidMount() {
    const { startFetch, match } = this.props;
    startFetch(match.params.slug);
  }

  render() {
    const { textComments, loading, errorMessage } = this.props;

    let textCommentsBody = null;

    if (errorMessage) {
      textCommentsBody = (<p style={{ textAlign: 'center' }}>{errorMessage}</p>);
      return textCommentsBody;
    }

    if (textComments.length > 0) {
      textCommentsBody = textComments.map((comment, index) => (
        <div
        style={{ marginBottom: '5px' }}
        className="card bg-success text-white"
        key={index}>
          <div
      style={{ textAlign: 'center' }}
      className="card-body">
            {comment.selected}
            <br />
            {comment.body}
            <br />
            comment by :
            {' '}
            {comment.author.username}
          </div>
        </div>
      ));
    } else {
      textCommentsBody = (<p style={{ textAlign: 'center' }}>Looks like no one has made any text comments ;)</p>);
    }

    if (loading) {
      textCommentsBody = <Spinner />;
    }

    return (
      <div className="container">
        {textCommentsBody}
      </div>
    );
  }
}

TextCommentList.propTypes = {
  textComments: PropTypes.array,
  startFetch: PropTypes.func,
  match: PropTypes.object,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
};

TextCommentList.defaultProps = {
  textComments: [],
  startFetch: () => {},
  match: {},
  loading: false,
  errorMessage: '',
};

const mapStateToProps = state => {
  return {
    textComments: state.articleTextComment.textComments,
    loading: state.articleTextComment.loading,
    errorMessage: state.articleTextComment.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startFetch: (slug) => dispatch(fetchTextComments(slug)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextCommentList);
