import { useEffect } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
// import Welcome from './Welcome'
import NotFoundPage from "./404";
import OAuthPage from "./oauth";
import LoginPage from "./login";
import SendMagicLinkPage from "./sendMagicLink";
import RegBasePage from "./reg";
import RegPage from "./reg/Register";
import RegWithUsernamePage from "./reg/RegWithUsername";
import HomePage from "./home";
import ChatPage from "./chat";
import FavoritesPage from "./favs";
import ContactsPage from "./contacts";
import RequireAuth from "../common/component/RequireAuth";
import RequireNoAuth from "../common/component/RequireNoAuth";
import Meta from "../common/component/Meta";

import store from "../app/store";
import InvitePage from "./invite";
import SettingPage from "./setting";
import SettingChannelPage from "./settingChannel";
import toast from "react-hot-toast";
import ResourceManagement from "./resources";
import Manifest from "../common/component/Manifest";

const PageRoutes = () => {
  const {
    ui: { online },
    fileMessages,
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
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        >
          <Route path="setting">
            <Route index element={<SettingPage />} />
            <Route path="channel/:cid" element={<SettingChannelPage />} />
          </Route>
          <Route index element={<ChatPage />} />
          <Route path="chat">
            <Route index element={<ChatPage />} />
            <Route path="channel/:channel_id" element={<ChatPage />} />
            <Route path="dm/:user_id" element={<ChatPage />} />
          </Route>
          <Route path="contacts">
            <Route index element={<ContactsPage />} />
            <Route path=":user_id" element={<ContactsPage />} />
          </Route>
          <Route path="favs" element={<FavoritesPage />}></Route>
          <Route
            path="files"
            element={<ResourceManagement fileMessages={fileMessages} />}
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
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
      <Manifest />
      <Meta />
      <PageRoutes />
    </Provider>
  );
}
