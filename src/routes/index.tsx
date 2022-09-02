import { Suspense, useEffect, lazy } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
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
const FavoritesPage = lazy(() => import("./favs"));
const OnboardingPage = lazy(() => import("./onboarding"));
const InvitePage = lazy(() => import("./invite"));
const SettingChannelPage = lazy(() => import("./settingChannel"));
const SettingPage = lazy(() => import("./setting"));
const ResourceManagement = lazy(() => import("./resources"));
import RequireAuth from "../common/component/RequireAuth";
import RequireNoAuth from "../common/component/RequireNoAuth";
import Meta from "../common/component/Meta";
import HomePage from "./home";
import ChatPage from "./chat";
import Loading from "../common/component/Loading";
import store, { useAppSelector } from "../app/store";
import GuestLogining from "./guest";
let toastId: string;
const PageRoutes = () => {
  const {
    ui: { online },
    fileMessages
  } = useAppSelector((store) => {
    return { ui: store.ui, fileMessages: store.fileMessage };
  });

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
      <Suspense fallback={<Loading fullscreen={true} />}>
        <Routes>
          <Route path="/guest_login" element={<GuestLogining />} />
          <Route path="/oauth/:token" element={<OAuthPage />} />
          <Route
            path="/login"
            element={
              <RequireNoAuth>
                <LoginPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="/send_magic_link"
            element={
              <RequireNoAuth>
                <SendMagicLinkPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="/register"
            element={
              <RequireNoAuth>
                <RegBasePage />
              </RequireNoAuth>
            }
          >
            <Route index element={<RegPage />} />
            <Route path="set_name">
              <Route index element={<RegWithUsernamePage />} />
              <Route path=":from" element={<RegWithUsernamePage />} />
            </Route>
          </Route>
          <Route
            path="/email_login"
            element={
              <RequireNoAuth>
                <SendMagicLinkPage />
              </RequireNoAuth>
            }
          />
          <Route path="/invite" element={<InvitePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          <Route
            key={"main"}
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          >
            <Route path="setting">
              <Route
                index
                element={
                  <Suspense fallback={<Loading />}>
                    <SettingPage />
                  </Suspense>
                }
              />
              <Route path="channel/:cid" element={<SettingChannelPage />} />
            </Route>
            <Route
              index
              element={
                // <Suspense fallback={<Loading />}>
                <ChatPage />
                // </Suspense>
              }
            />
            <Route path="chat">
              <Route index element={<ChatPage />} />
              <Route
                path="channel/:channel_id"
                element={
                  // <Suspense fallback={<Loading />}>
                  <ChatPage />
                  // </Suspense>
                }
              />
              <Route
                path="dm/:user_id"
                element={
                  // <Suspense fallback={<Loading />}>
                  <ChatPage />
                  // </Suspense>
                }
              />
            </Route>
            <Route path="users">
              <Route
                index
                element={
                  <Suspense fallback={<Loading />}>
                    <UsersPage />
                  </Suspense>
                }
              />
              <Route
                path=":user_id"
                element={
                  <Suspense fallback={<Loading />}>
                    <UsersPage />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="favs"
              element={
                <Suspense fallback={<Loading />}>
                  <FavoritesPage />
                </Suspense>
              }
            ></Route>
            <Route
              path="files"
              element={
                <Suspense fallback={<Loading />}>
                  <ResourceManagement fileMessages={fileMessages} />
                </Suspense>
              }
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
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
