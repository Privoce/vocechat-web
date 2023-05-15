import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useGetInitializedQuery } from "@/app/services/auth";
import { useAppSelector } from "@/app/store";

interface Props {
  children: ReactElement;
  redirectTo?: string;
}

const RequireNoAuth: FC<Props> = ({ children, redirectTo = "/" }) => {
  const { isLoading } = useGetInitializedQuery();
  const { token, initialized } = useAppSelector((store) => store.authData);
  if (isLoading) return null;
  //  未初始化 则先走setup 流程
  if (!initialized) return <Navigate to={`/onboarding`} replace />;
  return token ? <Navigate to={redirectTo} replace /> : children;
};

export default RequireNoAuth;
