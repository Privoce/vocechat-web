import { useState } from "react";
import { hideAll } from "tippy.js";
import Tippy from "@tippyjs/react";
import Menu from "../component/ContextMenu";

export default function useContextMenu(placement = "right-start") {
  const [visible, setVisible] = useState(false);
  // for tippy.js
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleContextMenuEvent = (evt) => {
    // console.log("context menu event", evt, evt.currentTarget);
    hideAll();
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
  const ContextMenu = ({ key, items, children }) => {
    return (
      <Tippy
        visible={visible}
        followCursor={"initial"}
        interactive
        placement="right-start"
        popperOptions={{ strategy: "fixed" }}
        onClickOutside={hideContextMenu}
        key={key}
        content={<Menu hideMenu={hideContextMenu} items={items} />}
      >
        {children}
      </Tippy>
    );
  };
  return {
    ContextMenu,
    offset,
    visible,
    hideContextMenu,
    handleContextMenuEvent
  };
}
