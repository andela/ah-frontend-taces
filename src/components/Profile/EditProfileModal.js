import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import classes from '../../CSS/editProfileModal.css';
import loginclasses from '../../CSS/login.css';
import { Loader } from '../Loader/Loader';

export class EditProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUsername: null,
      imageUrl: null,
      imageUploadState: 'none',
      emptyFieldState: true,
      newBio: null,
    };
  }

  fileSelectedHandler = event => {
    this.fileUploadHandler(event.target.files[0]);
  };

  fileUploadHandler = picture => {
    this.setState({
      imageUploadState: 'block',
    });
    const CLOUDINARY_APIKEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
    const PRESET_URL = process.env.REACT_APP_CLOUDINARY_PRESET_URL;
    const formData = new FormData();
    formData.append('file', picture);
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ronzalo777/image/upload';
    formData.append('upload_preset', PRESET_URL);
    formData.append('api_key', CLOUDINARY_APIKEY);
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
      upload_preset: PRESET_URL,
    }).then(response => {
      this.setState({
        imageUrl: response.data.url,
        imageUploadState: 'none',
      });
    });
  };

  dataUpdateHandler = e => {
    e.preventDefault();
    this.setState({ loadingClass: `${loginclasses.loading}` });
    const { imageUrl, newUsername, newBio } = this.state;

    const data = { username: newUsername, image: imageUrl, bio: newBio };

    axios
      .put('https://authors-haven-tabs.herokuapp.com/api/profiles/update/', data, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      })
      .then(() => {
        const { updateChildData } = this.props;
        updateChildData(data);
        this.setState({ loadingClass: '' });
      })
      .catch(() => {
        window.alert('update failed! your bio was too long.');
        this.setState({ loadingClass: '' });
      });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    const { imageUrl, newUsername, newBio } = this.state;
    if (imageUrl !== null && newUsername !== null && newBio !== null) {
      this.setState({ emptyFieldState: false });
    }
  };

  render() {
    const { bio, username } = this.props;

    const {
      imageUploadState,
      emptyFieldState, loadingClass,
    } = this.state;

    return (
      <Wrapper>
        <div className={loadingClass} />
        <div className={classes.tooltip}>
          <button
            className={classes.editProfileBtn}
            type="button"
            data-toggle="modal"
            id="BtnMe"
            data-target="#exampleModalCenter"
          >
            {username}
          </button>
          <span className={classes.tooltiptext}>click here to edit</span>
        </div>
        <div
          className="modal fade text-left"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Edit Profile
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="editProfileForm">
                  <div>
                    <label
                      htmlFor="username"
                      className={`col-sm-12 text-left ${classes.labelProfile}`}
                    >
                      Username
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="newUsername"
                        onChange={this.handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <div>
                      <div className="col-sm-4 float-left">
                        <label
                          htmlFor="imagePicker"
                          className={`btn btn-outline-dark ${classes.imagePicker}`}
                        >
                          Upload Image
                          <input
                            type="file"
                            onChange={this.fileSelectedHandler}
                            className={classes.fileInputButton}
                            id="imagePicker"
                            name="newImage"
                          />
                        </label>
                      </div>
                      <div clasName="col-sm-12" style={{ display: imageUploadState }}>
                        <Loader />
                      </div>
                    </div>
                  </div>
                  <div className="form-group float-left col-sm-12 p-0">
                    <span className="text-left ">Bio</span>
                    <textarea
                      className="form-control"
                      name="newBio"
                      form="editProfileForm"
                      rows="4"
                      onChange={this.handleInputChange}
                    >
                      {bio}
                    </textarea>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark" data-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  disabled={emptyFieldState}
                  onClick={this.dataUpdateHandler}
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
EditProfileModal.propTypes = {
  bio: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default EditProfileModal;
