import React, { Component } from 'react';
import classes from './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
          <h1 className={classes.title}>Welcome to Authors Haven</h1>
      </div>
    );
  }
}

export default connect()(App);
