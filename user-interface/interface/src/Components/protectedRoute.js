import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
  const authToken = Cookies.get('token');

  if (!authToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
