import React from 'react';
import { connect } from 'react-redux';
import { hidePopin } from '../../redux/Popin/action';
import Popin from './Popin';

const mapStateToProps = state => ({
  isOpen: state.open
});

const mapDispatchToProps = dispatch => {
  return {
    hidePopin: () => {
      dispatch(hidePopin());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popin);
