export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';
export const SET_RESULT_SEARCH = 'SET_RESULT_SEARCH';

export const updateSearch = text => {
  return {
    type: UPDATE_SEARCH,
    text
  };
};

export const setResultSearch = result => {
  return {
    type: SET_RESULT_SEARCH,
    result
  };
};

export const toggleFilter = (filterType, name, isActive) => {
  return {
    type: TOGGLE_FILTER,
    filterType,
    name,
    isActive
  };
};

export const toggleFilters = () => {
  return {
    type: TOGGLE_FILTERS
  };
};
