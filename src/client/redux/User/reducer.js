import { SIGN_UP, LOGIN, LOGOUT } from './action';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    case SIGN_UP:
    case LOGIN:
    case LOGOUT:
    default:
      return state;
  }
};
