import '../../styles/_test.scss';
import React from 'react';

import axios from 'axios';

class Test extends React.Component {
  constructor() {
    super();

    this.state = {
      hello: 'Hello'
    };
  }

  render() {
    const { hello } = this.state;
    return (
      <main>
        <p>{hello}</p>
        <p>Hi</p>
        <p>What's up ?</p>
      </main>
    );
  }
}

export default Test;
