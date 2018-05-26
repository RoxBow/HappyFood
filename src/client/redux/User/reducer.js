import { SIGN_UP, LOGIN, SET_AUTHENTICATION, LOGOUT } from './action';

const initialState = {
  isAuthenticated: false,
  isLoading: true
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isLoading: false
      };
    default:
      return state;
  }
};

export default userReducer;
