import { FC, ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGetInitializedQuery, useLazyGuestLoginQuery } from "@/app/services/auth";
import { useGetLoginConfigQuery } from "@/app/services/server";
import { useAppSelector } from "@/app/store";

interface Props {
  children: ReactElement;
}
const GuestOnly: FC<Props> = ({ children }) => {
  const { data: loginConfig, isLoading: fetchingConfig } = useGetLoginConfigQuery();
  const { isLoading: initChecking } = useGetInitializedQuery();
  const [guestLogin, { isLoading: guestSigning }] = useLazyGuestLoginQuery();
  const { token, user, initialized } = useAppSelector((store) => store.authData);

  useEffect(() => {
    // 未登录
    if (!token) {
      guestLogin();
    }
  }, [token]);

  // 已登录的非guest用户
  if (token && user?.create_by !== "guest") {
    return <Navigate to={`/`} replace />;
  }
  if (initChecking || guestSigning || fetchingConfig) return null;
  // console.log("guest check", token, user, loginConfig?.guest, initialized);
  // 检查有没有开启guest mode
  if (!loginConfig?.guest) return <Navigate to={`/v/off`} replace />;
  //  未初始化 则先走setup 流程
  if (!initialized) return <Navigate to={`/onboarding`} replace />;
  return token ? children : null;
};

export default GuestOnly;
