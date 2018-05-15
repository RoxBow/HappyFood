import './styles/_reset.scss';
import React, { Component } from 'react';
import Header from './components/Header/HeaderContainer';
import Home from './components/Home/Home';
import Popin from './components/Popin/PopinContainer';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <Home />
        <Popin />
      </div>
    );
  }
}

export default App;
