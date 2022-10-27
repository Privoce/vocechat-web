import { useState, useEffect } from "react";
import { useGetServerQuery } from "../app/services/server";

import Icon from "./Icon";
import Popup from "./Popup";
import usePreload from "./usePreload";
// type Props = {

// };

function Widget() {
  const { rehydrated } = usePreload();
  const [visible, setVisible] = useState(false);
  const { isLoading, isError } = useGetServerQuery();
  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };
  useEffect(() => {
    // 有无iframe内嵌
    const parentWindow = window.parent;
    if (parentWindow) {
      parentWindow.postMessage(visible ? 'OPEN' : 'CLOSE', '*');
    }
  }, [visible]);
  if (isLoading || isError || !rehydrated) return null;
  return visible ? <Popup handleClose={toggleVisible} /> : <Icon handleClick={toggleVisible} />;
}

export default Widget;
