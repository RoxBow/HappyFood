import { combineReducers } from 'redux';
import user from './User/reducer';
import popin from './Popin/reducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
  user,
  popin,
  form
});
