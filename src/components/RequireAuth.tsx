import { FC, ReactElement, memo } from "react";
import { matchRoutes, Navigate, useLocation } from "react-router-dom";

import { GuestRoutes, KEY_LOCAL_TRY_PATH } from "@/app/config";
import { useAppSelector } from "@/app/store";
import Loading from "./Loading";
import { shallowEqual } from "react-redux";

interface Props {
  guestMode?: boolean;
  children: ReactElement;
  redirectTo?: string;
}
const GuestAllows = GuestRoutes.map((path) => {
  return { path };
});
const RequireAuth: FC<Props> = ({ children, redirectTo = "/login", guestMode }) => {
  const location = useLocation();
  const matches = matchRoutes(GuestAllows, location);
  const allowGuest = matches ? !!matches[0].pathname : false;
  const token = useAppSelector((store) => store.authData.token, shallowEqual);
  const guest = useAppSelector((store) => store.authData.guest, shallowEqual);
  const initialized = useAppSelector((store) => store.authData.initialized, shallowEqual);
  console.info("check basic info", guestMode);
  // 初始化login配置检查
  if (typeof guestMode == "undefined")
    return <Loading fullscreen={true} reload context="auth-route" />;
  //  未初始化 则先走setup 流程
  if (!initialized) return <Navigate to={`/onboarding`} replace />;
  // 开启guest 并且没token 而且是允许guest访问的路由  则先去过渡页登录
  if (!token) {
    // 记录下当前的路径，登录后跳转回来
    const ignorePath = `/setting/my_account`;
    localStorage.setItem(
      KEY_LOCAL_TRY_PATH,
      ignorePath == location.pathname ? "/" : `${location.pathname}${location.search}`
    );
    const guestLogin = guestMode && allowGuest;
    return guestLogin ? (
      <Navigate to={"/guest_login"} replace />
    ) : (
      <Navigate to={redirectTo} replace />
    );
  }
  // 登陆者是guest，并且不允许访问
  if (token && guest && !allowGuest) return <Navigate to={"/"} replace />;
  const tryPath = localStorage.getItem(KEY_LOCAL_TRY_PATH);
  if (tryPath) {
    localStorage.removeItem(KEY_LOCAL_TRY_PATH);
    return <Navigate to={tryPath} replace />;
  }
  return children;
};

export default memo(RequireAuth, (prev, next) => {
  return prev.guestMode === next.guestMode;
});
