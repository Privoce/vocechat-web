// import React from 'react'
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function RequireNoAuth({ children, redirectTo = "/" }) {
  const { token } = useSelector((store) => store.authData);
  return token ? <Navigate to={redirectTo} replace /> : children;
}
