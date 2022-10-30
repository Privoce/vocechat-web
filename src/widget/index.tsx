import { useState } from "react";
import { useGetServerQuery } from "../app/services/server";

import Icon from "./Icon";
import Popup from "./Popup";
import usePreload from "./usePreload";
type Props = {
  hostId: number
};

function Widget({ hostId }: Props) {
  const { rehydrated } = usePreload();
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
  return visible ? <Popup handleClose={toggleVisible} hostId={hostId} /> : <Icon handleClick={toggleVisible} />;
}

export default Widget;
