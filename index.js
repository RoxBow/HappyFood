import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './src/client/App';
import thunk from 'redux-thunk';
import axios from 'axios';
import rootReducer from './src/client/redux/index';
import { setAuthentication } from './src/client/redux/User/action';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

axios
  .get('/checkUserAuthentication')
  .then(res => {
    const isAuthenticated = res.data.isAuthenticated;
    store.dispatch(setAuthentication(isAuthenticated));
  })
  .catch(err => {
    console.log(err);
  });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
