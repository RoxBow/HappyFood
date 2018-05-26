import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      render={props =>
        isAuthenticated ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/noAccess', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
