// import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import ContextMenu from "../ContextMenu";
import IconDelete from "../../../assets/icons/delete.svg";
import IconEdit from "../../../assets/icons/edit.svg";
import IconReply from "../../../assets/icons/reply.svg";
import IconForward from "../../../assets/icons/forward.svg";
import IconPin from "../../../assets/icons/pin.svg";
import IconCopy from "../../../assets/icons/copy.svg";
import IconSelect from "../../../assets/icons/select.svg";
import { updateSelectMessages } from "../../../app/slices/ui";
import { addReplyingMessage } from "../../../app/slices/message";

import useMessageOperation from "./useMessageOperation";

export default function MessageContextMenu({
  context,
  contextId,
  mid,
  offset = {},
  visible,
  hide,
  editMessage,
  children,
}) {
  const {
    copyContent,
    isMarkdown,
    canEdit,
    canPin,
    canCopy,
    canReply,
    pinned,
    unPin,
    toggleDeleteModal,
    toggleForwardModal,
    togglePinModal,
    PinModal,
    ForwardModal,
    DeleteModal,
  } = useMessageOperation({ mid, contextId, context });
  const dispatch = useDispatch();
  const handleSelect = () => {
    dispatch(updateSelectMessages({ context, id: contextId, data: mid }));
    // hideAll();
  };
  const handleReply = () => {
    // console.log("dddd", contextId, mid);
    if (contextId) {
      dispatch(addReplyingMessage({ id: contextId, mid }));
    }
  };
  return (
    <>
      {ForwardModal}
      {PinModal}
      {DeleteModal}
      <Tippy
        duration={0}
        delay={[0, 0]}
        content={
          <ContextMenu
            hideMenu={hide}
            items={[
              canEdit && {
                title: "Edit Message",
                icon: <IconEdit className="icon" />,
                handler: editMessage,
              },
              canReply && {
                title: "Reply",
                icon: <IconReply className="icon" />,
                handler: handleReply,
              },
              canCopy && {
                title: "Copy",
                icon: <IconCopy className="icon" />,
                handler: copyContent,
              },
              canPin && {
                title: pinned ? "Unpin" : "Pin",
                icon: <IconPin className="icon" />,
                handler: pinned ? unPin.bind(null, mid) : togglePinModal,
              },
              {
                title: "Forward",
                icon: <IconForward className="icon" />,
                handler: toggleForwardModal,
              },
              {
                title: "Select",
                icon: <IconSelect className="icon" />,
                handler: handleSelect,
              },
              {
                title: "Delete",
                danger: true,
                icon: <IconDelete className="icon" />,
                handler: toggleDeleteModal,
              },
            ]}
          />
        }
        interactive
        placement="right-start"
        popperOptions={{ strategy: "fixed" }}
        offset={[offset.y, offset.x]}
        visible={visible}
        onClickOutside={hide}
        key={mid}
      >
        {children}
      </Tippy>
    </>
  );
}
