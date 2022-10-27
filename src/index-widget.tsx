import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import Widget from "./widget/index";
import './assets/index.css';
import store from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <Widget />
  </Provider>
);
