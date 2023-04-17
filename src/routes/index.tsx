import { useEffect, lazy } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
import { isEqual } from "lodash";

import NotFoundPage from "./404";
// import Welcome from './Welcome'
// const HomePage = lazy(() => import("./home"));
// const ChatPage = lazy(() => import("./chat"));
const RegBasePage = lazy(() => import("./reg"));
const RegWithUsernamePage = lazy(() => import("./reg/RegWithUsername"));
const SendMagicLinkPage = lazy(() => import("./sendMagicLink"));
const RegPage = lazy(() => import("./reg/Register"));
const LoginPage = lazy(() => import("./login"));
const OAuthPage = lazy(() => import("./oauth"));
const UsersPage = lazy(() => import("./users"));
const CallbackPage = lazy(() => import("./callback"));
const FavoritesPage = lazy(() => import("./favs"));
const OnboardingPage = lazy(() => import("./onboarding"));
const SettingChannelPage = lazy(() => import("./settingChannel"));
const SettingDMPage = lazy(() => import("./settingDM"));
const SettingPage = lazy(() => import("./setting"));
const ResourceManagement = lazy(() => import("./resources"));
const GuestLogin = lazy(() => import("./guest"));
const ChatPage = lazy(() => import("./chat"));
const HomePage = lazy(() => import("./home"));
import RequireAuth from "../common/component/RequireAuth";
import RequireNoAuth from "../common/component/RequireNoAuth";
import Meta from "../common/component/Meta";
import LazyIt from './lazy';
import store, { useAppSelector } from "../app/store";
import useDeviceToken from "../common/component/Notification/useDeviceToken";
import { vapidKey } from "../app/config";
import RequireSingleTab from "../common/component/RequireSingleTab";
import InvitePrivate from "./invitePrivate";
let toastId: string;
const PageRoutes = () => {
  const {
    ui: { online },
    fileMessages
  } = useAppSelector((store) => {
    return { ui: store.ui, fileMessages: store.fileMessage };
  }, isEqual);
  // 提前获取device token
  useDeviceToken(vapidKey);

  // 掉线检测
  useEffect(() => {
    if (!online) {
      toastId = toast.error("Network Offline!", { duration: Infinity });
    } else if (toastId) {
      toast.dismiss(toastId);
    }
  }, [online]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/guest_login" element={<LazyIt><GuestLogin /></LazyIt>} />
        <Route path="/invite_private" element={<LazyIt><RequireAuth><InvitePrivate /></RequireAuth></LazyIt>} />
        <Route path="/cb/:type/:payload" element={<LazyIt><CallbackPage /></LazyIt>} />
        <Route path="/oauth/:token" element={<LazyIt><OAuthPage /></LazyIt>} />
        <Route
          path="/login"
          element={
            <LazyIt>
              <RequireNoAuth>
                <LoginPage />
              </RequireNoAuth>
            </LazyIt>
          }
        />
        <Route
          path="/send_magic_link"
          element={
            <LazyIt>
              <RequireNoAuth>
                <SendMagicLinkPage />
              </RequireNoAuth>
            </LazyIt>
          }
        />
        <Route
          path="/register"
          element={
            <LazyIt>
              <RequireNoAuth>
                <RegBasePage />
              </RequireNoAuth>
            </LazyIt>
          }
        >
          <Route index element={<LazyIt><RegPage /></LazyIt>} />
          <Route path="set_name/:from?" element={<LazyIt><RegWithUsernamePage /></LazyIt>} />
        </Route>
        <Route
          path="/email_login"
          element={
            <LazyIt>
              <RequireNoAuth>
                <SendMagicLinkPage />
              </RequireNoAuth>
            </LazyIt>
          }
        />
        <Route path="/onboarding" element={<LazyIt><OnboardingPage /></LazyIt>} />

        <Route
          key={"main"}
          path="/"
          element={
            <LazyIt>
              <RequireAuth>
                {/* 只允许活跃一个tab标签 */}
                <RequireSingleTab>
                  <HomePage />
                </RequireSingleTab>
              </RequireAuth>
            </LazyIt>
          }
        >
          <Route path="setting">
            <Route
              index
              element={
                <LazyIt>
                  <SettingPage />
                </LazyIt>
              }
            />
            <Route path=":nav?" element={<LazyIt><SettingPage /></LazyIt>} />
            <Route path="channel/:cid/:nav?" element={<LazyIt><SettingChannelPage /></LazyIt>} />
            <Route path="dm/:uid/:nav?" element={<LazyIt><SettingDMPage /></LazyIt>} />
          </Route>
          <Route
            index
            element={
              <LazyIt>
                <ChatPage />
              </LazyIt>
            }
          />
          <Route path="chat">
            <Route index element={<LazyIt><ChatPage /></LazyIt>} />
            <Route
              path="channel/:channel_id"
              element={
                <LazyIt>
                  <ChatPage />
                </LazyIt>
              }
            />
            <Route
              path="dm/:user_id"
              element={
                <LazyIt>
                  <ChatPage />
                </LazyIt>
              }
            />
          </Route>
          <Route path="users">
            <Route
              index
              element={
                <LazyIt>
                  <UsersPage />
                </LazyIt>
              }
            />
            <Route
              path=":user_id"
              element={
                <LazyIt>
                  <UsersPage />
                </LazyIt>
              }
            />
          </Route>
          <Route
            path="favs"
            element={
              <LazyIt>
                <FavoritesPage />
              </LazyIt>
            }
          ></Route>
          <Route
            path="files"
            element={
              <LazyIt>
                <ResourceManagement fileMessages={fileMessages} />
              </LazyIt>
            }
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default function ReduxRoutes() {

  return (
    <Provider store={store}>
      <Meta />
      <PageRoutes />
    </Provider>
  );
}
