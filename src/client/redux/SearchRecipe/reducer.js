import { UPDATE_SEARCH, TOGGLE_FILTER } from './action';

const initialState = {
  text: '',
  diet: [],
  allergie: []
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return Object.assign({}, state, {
        text: action.text
      });
    case TOGGLE_FILTER:
      return Object.assign({}, state, {
        [action.filterType]: action.isActive
          ? state[action.filterType].concat(action.name)
          : state[action.filterType].filter(item => item !== action.name)
      });
    default:
      return state;
  }
};

export default filterReducer;
