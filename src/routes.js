import React from 'react';
import PropTypes from 'prop-types';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Wrapper from './hoc/Wrapper/Wrapper';
import Header from './containers/Header/Header';
import Footer from './components/Foot/Foot';
import CreateArticle from './components/Articles/createArticle';
import Profile from './containers/Profile/Profile';
import { FollowGrid } from './containers/FollowGrid/FollowGrid';
import { FollowerGrid } from './containers/FollowGrid/FollowerGrid';

import ArticleDetail from './containers/Articles/ArticleDetail/ArticleDetail';
import ArticleList from './containers/Articles/ArticleList/ArticleList';

const routes = (props) => {
  const { authStatus } = props;
  return (
    <div>
      <BrowserRouter>
        <Wrapper>
          <Header />
          <Switch>
            {authStatus ? <Route path="/articles/:slug" exact component={ArticleDetail} /> : null}
            {authStatus ? <Route path="/createArticle" exact component={CreateArticle} /> : null}
            {authStatus ? <Route path="/profile" exact component={Profile} /> : null}
            {authStatus ? <Route path="/articles" exact component={ArticleList} /> : null}
            {authStatus ? <Route path="/profile/following" exact component={FollowGrid} /> : null}
            {authStatus ? <Route path="/profile/followers" exact component={FollowerGrid} /> : null}
            <Route path="/" exact component={Home} />
            <Redirect from="/" to="/" />
          </Switch>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </div>
  );
};

routes.propTypes = {
  authStatus: PropTypes.bool,
};

routes.defaultProps = {
  authStatus: false,
};

const mapStateToProps = state => {
  // map state to props
  return {
    authStatus: state.isAuthentic.isAuthentic,
  };
};

export default connect(mapStateToProps)(routes);
