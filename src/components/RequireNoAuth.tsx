import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useGetInitializedQuery } from "@/app/services/auth";
import { useAppSelector } from "@/app/store";
import { shallowEqual } from "react-redux";

interface Props {
  children: ReactElement;
  redirectTo?: string;
}

const RequireNoAuth: FC<Props> = ({ children, redirectTo = "/" }) => {
  const { isLoading } = useGetInitializedQuery();
  const { token, initialized, guest } = useAppSelector((store) => store.authData, shallowEqual);
  if (isLoading) return null;
  //  未初始化 则先走 setup 流程
  if (!initialized) return <Navigate to={`/onboarding`} replace />;
  return token && !guest ? <Navigate to={redirectTo} replace /> : children;
};

export default RequireNoAuth;
