import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import ProfileListItem from '../../components/Profile/ProfileListItem';
import EditProfileModal from '../../components/Profile/EditProfileModal';
import classes from '../../CSS/Profile.css';
import { generatePhotoLink } from '../../assets/utils/ImageCropper';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articles: [],
      followers: '',
      following: '',
    };
  }

  componentDidMount() {
    this.getInitialUserData();
    this.getInitialArticleData();
    this.getFollowers();
    this.getFollowing();
  }

  getInitialUserData = () => this.getUser()
    .then(response => this.handleResponse('user', response.data.user))
    .catch(() => {});

  getUser = () => axios
    .get('https://authors-haven-tabs.herokuapp.com/api/user/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
    .then(response => response)
    .catch(error => error);

  handleResponse = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  getInitialArticleData = () => this.getArticles()
    .then(response => this.handleResponse('articles', response.data.results.articles))
    .catch(() => {});

  getArticles = () => axios
    .get('https://authors-haven-tabs.herokuapp.com/api/articles/all/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
    .then(response => response)
    .catch(() => {});

  getFollowers = () => axios
    .get('https://authors-haven-tabs.herokuapp.com/api/users/my/followers/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
    .then(response => this.handleResponse('followers', response.data.followers.count))
    .catch(() => {});

  getFollowing = () => axios
    .get('https://authors-haven-tabs.herokuapp.com/api/users/my/following/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
    .then(response => this.handleResponse('following', response.data.following.count))
    .catch(() => {});

  updateChildData = user => {
    this.setState({
      user,
    });
  };

  getUserImage = () => {
    const { user } = this.state;
    if (user.image) {
      return generatePhotoLink(user.image);
    }
    return localStorage.getItem('picture');
  };

  render() {
    const { user } = this.state;
    const { articles } = this.state;
    const { followers } = this.state;
    const { following } = this.state;
    return (
      <Wrapper>
        <div className={`container ${classes.mainDiv}`}>
          <div
            className="col-md-3 float-left"
            style={{
              height: 'auto',
              overflow: 'auto',
            }}
          >
            <div className={classes.profileImgDiv}>
              <img
                className={classes.profileImg}
                id="Img"
                src={this.getUserImage()}
                alt=""
              />
            </div>
            <h5 className={`font-weight-bold ${classes.marginTopUD}`}>Tags</h5>
            <p>Relationships, Sports, Cinema, Literature, Cosmos</p>
            <h5 className={`font-weight-bold ${classes.marginTopUD}`}>Popular articles</h5>
            <ul className={classes.unOrderedList}>
              <li>
                <a
                  className={classes.linkStyle}
                  href="https://pmcdeadline2.files.wordpress.com/2016/02/djimon-hounsou.jpeg"
                >
                  Chimps in Uganda
                </a>
              </li>
              <li>
                <a
                  className={classes.linkStyle}
                  href="https://pmcdeadline2.files.wordpress.com/2016/02/djimon-hounsou.jpeg"
                >
                  Top movies of 2018
                </a>
              </li>
              <li>
                <a
                  className={classes.linkStyle}
                  href="https://pmcdeadline2.files.wordpress.com/2016/02/djimon-hounsou.jpeg"
                >
                  The best footballers
                </a>
              </li>
              <li>
                <a
                  className={classes.linkStyle}
                  href="https://pmcdeadline2.files.wordpress.com/2016/02/djimon-hounsou.jpeg"
                >
                  Bees and flowers preserve man kind
                </a>
              </li>
              <li>
                <a
                  className={classes.linkStyle}
                  href="https://pmcdeadline2.files.wordpress.com/2016/02/djimon-hounsou.jpeg"
                >
                  Chimps in Uganda
                </a>
              </li>
            </ul>
          </div>
          <div>
            <EditProfileModal
              bio={user.bio}
              username={user.username}
              image={user.image}
              updateChildData={this.updateChildData}
            />
          </div>
          <div className={`col-md-9 p-0 float-left ${classes.bioDiv}`}>
            <p id="bio">{user.bio}</p>

            <NavLink to="/profile/following" className="btn btn-outline-dark">
              Following
            </NavLink>
            <NavLink
              to="/profile/followers"
              className={`btn btn-outline-dark ${classes.followersBtn}`}
            >
              Followers
            </NavLink>
          </div>
          <div className="col-md-9 float-left pt-0 pb-0 pl-0 pr-0 mt-0 mb-0 ml-0 mr-0">
            <div className="col-md-12 p-0  float-left" style={{ height: 'auto' }}>
              <div className="col-md-2 p-0 float-left">
                <h5 className="font-weight-bold text-left">Articles</h5>
                <span className="text-center">100k</span>
              </div>
              <div className="col-md-2 p-0 float-left">
                <h5 className="font-weight-bold text-left">Followers</h5>
                <span className="text-center">{followers}</span>
              </div>
              <div className="col-md-2 p-0 float-left">
                <h5 className="font-weight-bold text-left">Following</h5>
                <span className="text-center">{following}</span>
              </div>
            </div>
            <div className={`col-md-12 xxx ${classes.articlesContainer}`}>
              {articles.map(article => {
                return (
                  <ProfileListItem
                    key={article.slug}
                    image={article.image}
                    title={article.title}
                    description={article.description}
                    likes={article.likesCount}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default Profile;
