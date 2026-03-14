import { useEffect, useState } from "react";

import Icon from "./Icon";
import Popup from "./Popup";
import useCache from "./useCache";
import { useWidget } from "./WidgetContext";
import ExtCssCode from "./ExtCssCode";

type Props = {
  hostId: number;
};

function Widget({ hostId }: Props) {
  const { embed } = useWidget();
  const { rehydrated } = useCache();
  const [visible, setVisible] = useState(!!new URLSearchParams(location.search).get("open"));

  const toggleVisible = () => {
    // 检测是否在 shadow DOM 中
    const rootNode = document.documentElement.getRootNode();
    const isShadowDOM = rootNode instanceof ShadowRoot;

    if (isShadowDOM) {
      // Shadow DOM 模式 - 不需要调用 window.VoceChatWidget，因为已经通过事件触发了
      // 这里只需要更新状态
    } else {
      // iframe 模式 - 使用 postMessage
      const parentWindow = window.parent;
      if (parentWindow) {
        parentWindow.postMessage(visible ? "CLOSE" : "OPEN", "*");
      }
    }
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (embed) {
      if (!visible) {
        document.documentElement.classList.add("close");
      } else {
        document.documentElement.classList.remove("close");
      }
    }
  }, [visible, embed]);

  // 监听来自父窗口的消息（iframe 模式）或自定义事件（shadow DOM 模式）
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "OPEN_FROM_PARENT") {
        setVisible(true);
      } else if (event.data === "CLOSE_FROM_PARENT") {
        setVisible(false);
      }
    };

    const handleShadowOpen = () => setVisible(true);
    const handleShadowClose = () => setVisible(false);
    const handleShadowToggle = () => setVisible((prev) => !prev);

    // 检测是否在 shadow DOM 中
    const shadowRoot = (window as any).__VOCECHAT_SHADOW_ROOT__;
    const isShadowDOM = shadowRoot instanceof ShadowRoot;

    if (isShadowDOM && shadowRoot instanceof ShadowRoot) {
      // Shadow DOM 模式 - 监听自定义事件
      shadowRoot.addEventListener("vocechat-widget-open", handleShadowOpen);
      shadowRoot.addEventListener("vocechat-widget-close", handleShadowClose);
      shadowRoot.addEventListener("vocechat-widget-toggle", handleShadowToggle);

      return () => {
        shadowRoot.removeEventListener("vocechat-widget-open", handleShadowOpen);
        shadowRoot.removeEventListener("vocechat-widget-close", handleShadowClose);
        shadowRoot.removeEventListener("vocechat-widget-toggle", handleShadowToggle);
      };
    } else {
      // iframe 模式 - 监听 postMessage
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, []);

  if (!rehydrated) return null;
  if (!embed)
    return (
      <>
        <ExtCssCode />
        <Popup handleClose={toggleVisible} hostId={hostId} />
      </>
    );
  return (
    <>
      <ExtCssCode />
      {visible ? (
        <Popup handleClose={toggleVisible} hostId={hostId} />
      ) : (
        <Icon handleClick={toggleVisible} />
      )}
    </>
  );
}

export default Widget;
