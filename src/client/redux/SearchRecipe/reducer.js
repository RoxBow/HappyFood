import { UPDATE_SEARCH, TOGGLE_FILTER, TOGGLE_FILTERS, SET_RESULT_SEARCH } from './action';

const initialState = {
  text: '',
  diet: [],
  health: [],
  result: [],
  filtersIsOpen: false
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
    case TOGGLE_FILTERS:
      return Object.assign({}, state, {
        filtersIsOpen: !state.filtersIsOpen
      });
    case SET_RESULT_SEARCH:
      return Object.assign({}, state, {
        result: action.result
      });
    default:
      return state;
  }
};

export default filterReducer;
