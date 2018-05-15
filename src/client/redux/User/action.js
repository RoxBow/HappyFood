import axios from 'axios';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
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
    .then( res => {
      const idUser = res.data;
      
      if (idUser) {
        localStorage.setItem("userId", idUser);
      }
    })
    .catch( err => {
      console.log('axios', err);
    });

  return {
    type: LOGIN
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
