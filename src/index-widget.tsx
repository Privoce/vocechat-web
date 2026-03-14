// 在 Shadow DOM 模式下，动态设置 webpack 的 publicPath
// 这样 webpack 运行时加载的动态资源（如代码分割的 chunk）会从正确的源服务器加载
let widgetOrigin = '';
if (typeof document !== 'undefined') {
  const currentScript = document.currentScript as HTMLScriptElement;
  if (currentScript && currentScript.src) {
    try {
      const scriptUrl = new URL(currentScript.src);
      // 获取脚本所在的目录路径（去掉文件名）
      const scriptPath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/') + 1);
      // 设置为脚本所在的完整目录路径
      __webpack_public_path__ = scriptUrl.origin + scriptPath;
      // 保存 origin 供 i18n 使用
      widgetOrigin = scriptUrl.origin;
      (window as any).__VOCECHAT_WIDGET_ORIGIN__ = widgetOrigin;
    } catch (e) {
      console.warn('Failed to set webpack public path:', e);
    }
  }
}

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
