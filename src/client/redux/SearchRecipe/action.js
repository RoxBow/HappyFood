export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';

export const updateSearch = text => {
  return {
    type: UPDATE_SEARCH,
    text
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
