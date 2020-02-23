// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  console.log("props");
  console.log(props);
  const { user } = props;
  const loggedIn = user && user.loggedIn;
  if (!loggedIn) {
    return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
  } else {
    return <Route {...props} />;
  }
}

export default PrivateRoute;
