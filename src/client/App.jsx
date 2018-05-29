import './styles/_reset.scss';
import './styles/_general.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Header from './components/Header/HeaderContainer';
import Home from './components/Home/Home';
import Popin from './components/Popin/PopinContainer';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Home />
          <Popin />
        </div>
      </Router>
    );
  }
}

export default App;
