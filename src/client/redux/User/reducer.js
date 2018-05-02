import { SIGN_UP, LOGIN, LOGOUT } from './action';

const initialState = {
  username: '',
  password: '',
  email: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
        email: action.email
      });
    case LOGIN:
    case LOGOUT:
    default:
      return state;
  }
};

export default userReducer;
