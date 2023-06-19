import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "../context/auth";

export default function DynamicRoute(props) {
  const { user } = useAuthState();

  if (props.authenticated && !user) {
    return <Navigate to="/login" />;
  } else if (props.guest && user) {
    return <Navigate to="/" />;
  } else {
    return <Route Component={props.component} {...props} />;
  }
}
