import { useState } from "react";

export default function useContextMenu(placement = "right-start") {
  const [visible, setVisible] = useState(false);
  // for tippy.js
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleContextMenuEvent = (evt) => {
    console.log("context menu event", evt, evt.currentTarget);
    evt.preventDefault();
    const { currentTarget, clientX, clientY } = evt;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    let x, y;
    if (placement == "right-start") {
      x = clientX - (left + width);
      y = top + height - clientY;
    } else {
      x = clientX - left;
      y = top - clientY;
    }
    setOffset({ x, y });

    setVisible(true);
    console.log("offset", x, y);
  };
  const hideContextMenu = () => {
    setVisible(false);
  };
  return {
    offset,
    visible,
    hideContextMenu,
    handleContextMenuEvent,
  };
}
