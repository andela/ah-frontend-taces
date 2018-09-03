import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Home extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <h1>This is home.</h1>
        </div>
        <div>
          <h2>Welcome home.</h2>
        </div>
      </Wrapper>
    );
  }
}

export default Home;
