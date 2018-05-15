import '../../styles/_popin.scss';
import React from 'react';
import FormSignUp from '../Form/FormSignupContainer';
import FormLogin from '../Form/FormLoginContainer';
import { LOGIN, SIGN_UP } from "../../constants";

const renderContent = popinType => {
  switch (popinType) {
    case SIGN_UP:
      return <FormSignUp />;
    case LOGIN:
      return <FormLogin />;
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
