// 必须首先导入初始化文件，设置 webpack publicPath 和 widget origin
import "./widget-init";

import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import Widget from "./widget/index";
import { WidgetProvider } from "./widget/WidgetContext";
import "./assets/index.css";
import store from "./app/store";
import "./i18n";
import { isDarkMode } from "./utils";

// 初始化函数，支持在 shadow DOM 或普通 DOM 中初始化
function initWidget(rootElement: HTMLElement, searchParams?: string) {
  const params = new URLSearchParams(searchParams || location.search);
  const hostId = params.get("host") || 1;

  // dark mode
  const rootDoc = rootElement.getRootNode() as Document | ShadowRoot;
  const docElement = rootDoc instanceof ShadowRoot ? rootElement : document.documentElement;

  if (isDarkMode()) {
    docElement.classList.add("dark");
  } else {
    docElement.classList.remove("dark");
  }

  // 如果是 Shadow DOM，将 shadowRoot 存储到 window 对象供 Widget 组件使用
  if (rootDoc instanceof ShadowRoot) {
    (window as any).__VOCECHAT_SHADOW_ROOT__ = rootDoc;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    hostId ? (
      <Provider store={store}>
        <WidgetProvider>
          <Toaster
            toastOptions={{
              className: "dark:!bg-gray-800 dark:!text-gray-50"
            }}
          />
          <Widget hostId={Number(hostId)} />
        </WidgetProvider>
      </Provider>
    ) : null
  );
}

// 暴露初始化函数给 shadow DOM 模式使用
(window as any).VoceChatWidgetInit = (shadowRoot: ShadowRoot, searchParams: string) => {
  const rootElement = shadowRoot.getElementById("root");
  if (rootElement) {
    initWidget(rootElement, searchParams);
  }
};

// 默认初始化（iframe 模式）
const rootElement = document.getElementById("root");
if (rootElement) {
  initWidget(rootElement);
}
