import { MouseEvent, ReactElement, useState } from "react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";

import Menu, { Item } from "@/components/ContextMenu";

interface ContextMenuProps {
  key: string | number;
  children: ReactElement;
  items: Item[];
}

export default function useContextMenu(placement = "right-start") {
  const [visible, setVisible] = useState(false);
  // for tippy.js
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleContextMenuEvent = (evt: MouseEvent) => {
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
  };

  const hideContextMenu = () => {
    setVisible(false);
  };

  const ContextMenu = ({ key, items, children }: ContextMenuProps) => {
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
