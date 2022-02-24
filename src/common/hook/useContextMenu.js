import { useState } from "react";

export default function useContextMenu() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleContextMenuEvent = (evt) => {
    console.log("context menu event", evt);
    evt.preventDefault();
    setVisible(true);
    setPos({ x: evt.clientX, y: evt.clientY });
  };
  const hideContextMenu = () => {
    setVisible(false);
  };
  return {
    posX: pos.x,
    posY: pos.y,
    visible,
    hideContextMenu,
    handleContextMenuEvent,
  };
}
