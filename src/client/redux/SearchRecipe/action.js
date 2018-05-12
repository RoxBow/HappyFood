export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export const updateSearch = text => {
  return {
    type: UPDATE_SEARCH,
    text
  };
};

export const toggleFilter = (filterType, name, isActive) => {
  return {
    type: 'TOGGLE_FILTER',
    filterType,
    name,
    isActive
  };
};