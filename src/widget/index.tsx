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
    // 有无 iframe 内嵌
    const parentWindow = window.parent;
    if (parentWindow) {
      parentWindow.postMessage(visible ? "CLOSE" : "OPEN", "*");
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

  // 监听来自父窗口的消息
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "OPEN_FROM_PARENT") {
        setVisible(true);
      } else if (event.data === "CLOSE_FROM_PARENT") {
        setVisible(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
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
