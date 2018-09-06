import React from 'react';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Article from './containers/Articles/Article';
import Wrapper from './hoc/Wrapper/Wrapper';
import Header from './containers/Header/Header';
import Footer from './components/Foot/Foot';
import CreateArticle from './components/Articles/createArticle';
import Profile from './containers/Profile/Profile';


const routes = (props) => {
  const { authStatus } = props;
  return (
    <div>
      <BrowserRouter>
        <Wrapper>
          <Header />
          <Switch>
            {authStatus ? <Route path="/articles/:slug" exact component={Article} /> : null}
            {authStatus ? <Route path="/createArticle" exact component={CreateArticle} /> : null}
            {authStatus ? <Route path="/profile" exact component={Profile} /> : null}
            <Route path="/" exact component={Home} />
            <Redirect from="/" to="/" />
          </Switch>
          <Footer />
        </Wrapper>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
  // map state to props
  return {
    authStatus: state.isAuthentic.isAuthentic,
  };
};

export default connect(mapStateToProps)(routes);
