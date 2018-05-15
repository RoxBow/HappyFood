import { SIGN_UP, LOGIN, LOGOUT } from './action';

const initialState = {
  authenticated: false,
  id: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return Object.assign({}, state, {
        authenticated: true
      });
    case LOGIN:
      return Object.assign({}, state, {
        authenticated: true
      });
    case LOGOUT:
    default:
      return state;
  }
};

export default userReducer;
