// import React from 'react'
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function RequireAuth({ children, redirectTo = "/login" }) {
  const { token } = useSelector((store) => store.authData);
  return token ? children : <Navigate to={redirectTo} />;
}
