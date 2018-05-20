import './styles/_reset.scss';
import './styles/_general.scss';
import { BrowserRouter } from 'react-router-dom';
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
      <BrowserRouter>
        <div>
          <Header />
          <Home />
          <Popin />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
