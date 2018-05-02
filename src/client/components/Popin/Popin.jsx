import '../../styles/_popin.scss';
import React, { Component } from 'react';
import FormSignUp from '../Form/FormContainer';

const renderContent = popinType => {
  switch (popinType) {
    case 'SIGNUP':
      return <FormSignUp />;
    default:
      return false;
  }
};

const Popin = ({ isOpen, hidePopin, popinType }) => (
  <div className={`popin ${isOpen ? 'active' : ''}`}>
    <span className="close" onClick={hidePopin}>
      X
    </span>
    {renderContent(popinType)}
  </div>
);

export default Popin;
