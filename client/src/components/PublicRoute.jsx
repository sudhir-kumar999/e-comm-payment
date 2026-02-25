import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { myContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(myContext);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  // Agar user already logged in hai
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
