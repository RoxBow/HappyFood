import axios from 'axios';
import { USER_ID } from '../../constants';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';

export const signUp = e => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;
  const email = e.target.email.value;

  axios
    .post('/signup', {
      username,
      password,
      email
    })
    .catch(err => {
      console.log(err);
    });

  return {
    type: SIGN_UP
  };
};

export const login = e => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  axios
    .post('/login', {
      username,
      password
    })
    .catch(err => {
      console.log('login error: ', err);
    });

  return {
    type: LOGIN
  };
};

export const setAuthentication = isAuthenticated => {
  return {
    type: SET_AUTHENTICATION,
    isAuthenticated
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
