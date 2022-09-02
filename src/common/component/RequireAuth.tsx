import { FC, ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGetInitializedQuery, useLazyGuestLoginQuery } from "../../app/services/auth";
import { useGetLoginConfigQuery } from "../../app/services/server";
import { useAppSelector } from "../../app/store";

interface Props {
  children: ReactElement;
  redirectTo?: string;
}

const RequireAuth: FC<Props> = ({ children, redirectTo = "/login" }) => {
  const { data: loginConfig, isLoading: fetchingLoginConfig } = useGetLoginConfigQuery();
  const { isLoading: checkingInitial } = useGetInitializedQuery();
  const [guestLogin] = useLazyGuestLoginQuery();
  const { token, initialized } = useAppSelector((store) => store.authData);
  useEffect(() => {
    // 已初始化 ， 没token，并且开启了guest，则guest自动登录
    if (initialized && !token && loginConfig?.guest) {
      guestLogin();
    }
  }, [token, initialized, loginConfig]);
  // 初始化和login配置检查
  if (checkingInitial || fetchingLoginConfig) return null;
  //  未初始化 则先走setup 流程
  if (!initialized) return <Navigate to={`/onboarding`} replace />;
  // 开启guest 并且没token  则等待guest登录结果
  if (loginConfig?.guest && !token) return null;
  return token ? children : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;
