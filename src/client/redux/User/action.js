import axios from 'axios';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const SET_ERROR = 'SET_ERROR';

export const requestSignUp = e => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;
  const email = e.target.email.value;

  return dispatch => {
    axios
      .post('/signup', {
        username,
        password,
        email
      })
      .then(res => {
        if (res.data.err) {
          dispatch(setError(res.data.err.message));
        } else {
          dispatch(signUp());
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const requestLogin = e => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  return dispatch => {
    axios
      .post('/login', {
        username,
        password
      })
      .then(res => {
        if (res.data.err) {
          dispatch(setError(res.data.err.message));
        } else {
          dispatch(login());
        }
      })
      .catch(err => {
        console.log('login error: ', err);
      });
  };
};

export const signUp = e => {
  return {
    type: SIGN_UP
  };
};

export const login = e => {
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
  axios.get('/logout').catch(err => {
    console.log(err);
  });

  return {
    type: LOGOUT
  };
};

export const setError = errorMessage => {
  return {
    type: SET_ERROR,
    errorMessage
  };
};
