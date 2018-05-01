import './styles/_reset.scss';
import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header/HeaderContainer';
import Popin from './components/Popin/PopinContainer';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <Popin />
      </div>
    );
  }
}

export default App;
