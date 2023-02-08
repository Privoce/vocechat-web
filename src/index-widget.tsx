import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import Widget from "./widget/index";
import './assets/index.css';
import store from "./app/store";
import './i18n';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const hostId = new URLSearchParams(location.search).get("host");
const themeColor = new URLSearchParams(location.search).get("themeColor") || "#1fe1f9";
root.render(
  hostId ? <Provider store={store}>
    <Widget hostId={Number(hostId)} themeColor={themeColor} />
  </Provider> : null
);
