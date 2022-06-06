// import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetInitializedQuery } from "../../app/services/auth";

export default function RequireAuth({ children, redirectTo = "/login" }) {
  const { isLoading } = useGetInitializedQuery();
  const { token, initialized } = useSelector((store) => store.authData);
  if (isLoading) return null;
  //  未初始化 则先走setup 流程
  if (!initialized) return <Navigate to={`/onboarding`} replace />;
  return token ? children : <Navigate to={redirectTo} replace />;
}
