import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import classes from '../../CSS/login.css';

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  eventListener = event => this.setState({ [event.target.name]: event.target.value });

  uploadImage = (picture) => {
    this.setState({ publishButtonDisabled: true });
    this.setState({ imageUploadState: `fa fa-2x fa-spinner fa-spin ${classes.fa}` });
    const formdata = new FormData();
    formdata.append('file', picture);
    const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY_IMAGE_UPLOAD;
    const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL_IMAGE_UPLOAD;
    const CLOUDINARY_PRESET_URL = process.env.REACT_APP_CLOUDINARY_CLOUDINARY_PRESET_URL;
    formdata.append('upload_preset', CLOUDINARY_PRESET_URL);
    formdata.append('api_key', API_KEY);
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formdata,
      upload_preset: CLOUDINARY_PRESET_URL,
    })
      .then((response) => {
        this.setState({ imageUrl: response.data.url });
        this.setState({ imageUploadState: `fa fa-2x fa-check ${classes.fa}` });
        this.setState({ publishButtonDisabled: false });
      });
  }

  onDrop = (event) => {
    this.uploadImage(event.target.files[0]);
  }

  addTags = event => this.setState({ [event.target.name]: event.target.value.split(',') });

  getHeaders = () => {
    const headers = {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    };
    return headers;
  }

  submitArticle = (e) => {
    e.preventDefault();
    this.setState({ loadingClass: `${classes.loading}` });
    const {
      imageUrl, tags, body, description, title,
    } = this.state;
    const { history } = this.props;
    const { push } = history;
    const data = {
      title,
      description,
      body,
      image: imageUrl,
      tags,
    };
    axios
      .post('https://authors-haven-tabs.herokuapp.com/api/articles', data, this.getHeaders())
      .then((response) => {
        push(`/articles/${response.data.article.slug}`);
      })
      .catch();
  };

  render() {
    const formNewData = `form-control ${classes.new_data}`;
    const { imageUploadState, loadingClass, publishButtonDisabled } = this.state;
    return (
      <div>
        <div className={loadingClass} />
        <div className="container py-5">
          <form name="createArticle" onSubmit={this.submitArticle}>
            <div className="row">
              <div className="col-md-12">
                <div className="header float-right" />
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                  type="text"
                  className={formNewData}
                  placeholder="enter the article title"
                  onChange={this.eventListener}
                  name="title"
                  required="required"
                />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className={formNewData}
                  placeholder="enter the article description"
                  onChange={this.eventListener}
                  name="description"
                  required="required"
                />
                </div>
                <div className="form-group">
                  <input
                  type="text"
                  className={formNewData}
                  placeholder="enter the article tags"
                  name="tags"
                  onChange={this.addTags}
                  required="required"
                />
                </div>
                <div className="form-group">
                  <textarea className={formNewData} cols="30" rows="10" name="body" onChange={this.eventListener} required="required" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="image" className="btn btn-outline-dark">
                  <span>
                    <i className="fa fa-cloud-upload" />
                    &nbsp;Upload Image
                  </span>
                  <input type="file" name="image" id="image" className={classes.fileInputButton} onChange={this.onDrop} accept="image/*" />
                </label>
                <i className={imageUploadState} />
              </div>
              <div className="col-md-6">
                <input type="submit" id="submitArticle" className="bordered float-right btn btn-dark" value="Publish" disabled={publishButtonDisabled} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  history: PropTypes.object,
};

CreateArticle.defaultProps = {
  history: {},
};

export default CreateArticle;
