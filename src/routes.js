import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Wrapper from './hoc/Wrapper/Wrapper';

const routes = () => (
  <BrowserRouter>
    <Wrapper>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Wrapper>
  </BrowserRouter>
);
export default routes;
