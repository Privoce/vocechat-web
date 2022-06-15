import { Suspense, useEffect, lazy } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import toast from "react-hot-toast";
// import Welcome from './Welcome'
import NotFoundPage from "./404";
// const HomePage = lazy(() => import("./home"));
const RegBasePage = lazy(() => import("./reg"));
// const ChatPage = lazy(() => import("./chat"));
const RegWithUsernamePage = lazy(() => import("./reg/RegWithUsername"));
const SendMagicLinkPage = lazy(() => import("./sendMagicLink"));
const RegPage = lazy(() => import("./reg/Register"));
const LoginPage = lazy(() => import("./login"));
const OAuthPage = lazy(() => import("./oauth"));
const ContactsPage = lazy(() => import("./contacts"));
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

import store from "../app/store";

const PageRoutes = () => {
  const {
    ui: { online },
    fileMessages
  } = useSelector((store) => {
    return { ui: store.ui, fileMessages: store.fileMessage };
  });
  // 掉线检测
  useEffect(() => {
    let toastId = 0;
    if (!online) {
      toast.error("Network Offline!", { duration: Infinity });
    } else {
      toast.dismiss(toastId);
    }
  }, [online]);

  return (
    <HashRouter>
      <Suspense fallback={<Loading fullscreen={true} />}>
        <Routes>
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
            path="/reg"
            element={
              <RequireNoAuth>
                <RegBasePage />
              </RequireNoAuth>
            }
          >
            <Route index element={<RegPage />} />
            <Route path="magiclink">
              <Route index element={<RegWithUsernamePage />} />
              <Route path=":token" element={<RegWithUsernamePage />} />
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
            path="/"
            element={
              // <Suspense fallback={<Loading />}>
              <RequireAuth>
                <HomePage />
              </RequireAuth>
              // </Suspense>
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
            <Route path="contacts">
              <Route
                index
                element={
                  <Suspense fallback={<Loading />}>
                    <ContactsPage />
                  </Suspense>
                }
              />
              <Route
                path=":user_id"
                element={
                  <Suspense fallback={<Loading />}>
                    <ContactsPage />
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
// const local_key = "AUTH_DATA";
export default function ReduxRoutes() {
  // const [authData, setAuthData] = useState(
  //   JSON.parse(localStorage.getItem(local_key))
  // );
  // const updateAuthData = (data) => {
  //   localStorage.setItem(local_key, JSON.stringify(data));
  //   setAuthData(data);
  // };
  return (
    <Provider store={store}>
      <Meta />
      <PageRoutes />
    </Provider>
  );
}
