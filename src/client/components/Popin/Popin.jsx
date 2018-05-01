import '../../styles/_popin.scss';
import React, { Component } from 'react';

const Popin = ({ isOpen, hidePopin }) =>
  <div className={`popin ${isOpen ? 'active' : ''}`} onClick={hidePopin}>
    Ceci est une popin
  </div>

export default Popin;
