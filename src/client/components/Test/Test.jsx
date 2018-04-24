import '../../styles/Test.scss';
import React, { Component } from 'react';

import axios from 'axios';

class Test extends Component {
  constructor() {
    super();

    this.state = {
      hello: 'hihi'
    };
  }

  componentDidMount() {
    axios
      .get(`/user`)
      .then(res => {
        console.log(res.data.user);
      })
      .catch(err => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <p>Bonjour</p>
        <p>Bonjour</p>
        <p>Bonjour</p>
      </div>
    );
  }
}

export default Test;
