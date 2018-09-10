import React from 'react';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Article from './containers/Articles/Article';


const routes = (props) => {
  const { authStatus } = props;
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {authStatus ? <Route path="/articles/:slug" exact component={Article} /> : null}
          <Route path="/" exact component={Home} />
          <Redirect from="/" to="/" />
        </Switch>
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
