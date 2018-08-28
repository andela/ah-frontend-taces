import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './containers/Home/Home';
import Wrapper from './hoc/Wrapper/Wrapper';

const routes = () => (
  <BrowserRouter>
    <Wrapper>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Wrapper>
  </BrowserRouter>
);
export default routes;
