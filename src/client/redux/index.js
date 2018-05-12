import { combineReducers } from 'redux';
import user from './User/reducer';
import popin from './Popin/reducer';
import search from './SearchRecipe/reducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
  user,
  popin,
  search,
  form,
});
