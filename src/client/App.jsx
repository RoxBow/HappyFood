import React, { Component } from 'react';
import axios from 'axios';
import Test from './components/Test/Test';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <Test />
      </main>
    );
  }
}

export default App;
