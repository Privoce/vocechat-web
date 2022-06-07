// import React from 'react'
import { Navigate } from "react-router-dom";
import { useGetInitializedQuery } from "../../app/services/auth";
import { useSelector } from "react-redux";

export default function RequireNoAuth({ children, redirectTo = "/" }) {
  const { isLoading } = useGetInitializedQuery();
  const { token, initialized } = useSelector((store) => store.authData);
  if (isLoading) return null;
  //  未初始化 则先走setup 流程
  if (!initialized) return <Navigate to={`/onboarding`} replace />;
  return token ? <Navigate to={redirectTo} replace /> : children;
}
