import React, { Component } from 'react';
import axios from 'axios';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import PersonCard from '../../components/Profile/PersonCard';
import classes from '../../CSS/FollowGrid.css';
import { Loader } from '../../components/Loader/Loader';

export class FollowGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followList: [],
      loaderStatus: 'block',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => this.getFollowing()
    .then(response => this.handleResponse(response.data.following.results))
    .catch(() => {});

  getFollowing = () => axios
    .get('https://authors-haven-tabs.herokuapp.com/api/users/my/following/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
    .then(response => response)
    .catch(err => err);

  handleResponse = value => {
    this.setState({
      followList: value,
    });
    this.checkListSize();
  };

  checkListSize = () => {
    this.setState({
      loaderStatus: 'block',
    });
    const { followList } = this.state;
    if (followList.length === 0) {
      const x = document.getElementById('followIndicator');
      x.style.display = 'block';
    }
    this.setState({
      loaderStatus: 'none',
    });
  };

  updateGrid = () => this.fetchData();

  render() {
    const { followList, loaderStatus } = this.state;
    return (
      <Wrapper>
        <div style={{ display: loaderStatus, textAlign: 'center' }}>
          <Loader />
        </div>
        <div className="container" style={{ height: '600px' }}>
          <h3
            id="followIndicator"
            className={classes.followindicator}
            style={{ display: 'none', textAlign: 'center' }}
          >
            You have no follows
          </h3>
          <div className={classes.container}>
            {followList.map(follow => {
              return (
                <div key={follow.username}>
                  <PersonCard
                    username={follow.username}
                    image={follow.image}
                    updateGrid={this.updateGrid}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default FollowGrid;
