import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as loginService from "services/loginService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log('PRIVATE-ROUTE');
  return (
    <Route
      {...rest}
      render={(props) =>
        loginService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  )
};

export default PrivateRoute;
