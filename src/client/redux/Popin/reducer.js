const initialState = {
  open: false
};

export const popinReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_POPIN':
      return Object.assign({}, state, {
        open: true
      });
    case 'HIDE_POPIN':
      return Object.assign({}, state, {
        open: false
      });
    default:
      return state;
  }
};
