import { useEffect, useState } from "react";

import Icon from "./Icon";
import Popup from "./Popup";
import useCache from "./useCache";
import { useWidget } from "./WidgetContext";

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

  if (!rehydrated) return null;
  if (!embed) return <Popup handleClose={toggleVisible} hostId={hostId} />;
  return visible ? (
    <Popup handleClose={toggleVisible} hostId={hostId} />
  ) : (
    <Icon handleClick={toggleVisible} />
  );
}

export default Widget;
