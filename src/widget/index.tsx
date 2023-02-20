import { useState } from "react";
import { useGetServerQuery } from "../app/services/server";
import { useWidget } from "./WidgetContext";
import Icon from "./Icon";
import Popup from "./Popup";
import useCache from "./useCache";
type Props = {
  hostId: number,
};

function Widget({ hostId }: Props) {
  const { embed } = useWidget();
  const { rehydrated } = useCache();
  const [visible, setVisible] = useState(!!new URLSearchParams(location.search).get("open"));
  const { isLoading, isError } = useGetServerQuery();
  const toggleVisible = () => {
    // 有无iframe内嵌
    const parentWindow = window.parent;
    if (parentWindow) {
      parentWindow.postMessage(visible ? 'CLOSE' : 'OPEN', '*');
    }
    setVisible((prev) => !prev);
  };
  if (isLoading || isError || !rehydrated) return null;
  if (!embed) return <Popup handleClose={toggleVisible} hostId={hostId} />;
  return visible ? <Popup handleClose={toggleVisible} hostId={hostId} /> : <Icon handleClick={toggleVisible} />;
}

export default Widget;
