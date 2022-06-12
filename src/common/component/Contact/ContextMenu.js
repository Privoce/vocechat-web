// import { useState } from "react";
import Tippy from "@tippyjs/react";
// import { useDispatch } from "react-redux";
import useContactOperation from "../../hook/useContactOperation";
import ContextMenu from "../ContextMenu";

export default function ContactContextMenu({ enable = false, uid, cid, visible, hide, children }) {
  const {
    canCall,
    call,
    copyEmail,
    canCopyEmail,
    startChat,
    canRemove,
    canRemoveFromChannel,
    removeFromChannel,
    removeUser
  } = useContactOperation({
    uid,
    cid
  });
  return (
    <>
      <Tippy
        disabled={!enable}
        visible={visible}
        followCursor={"initial"}
        interactive
        placement="right-start"
        popperOptions={{ strategy: "fixed" }}
        onClickOutside={hide}
        key={uid}
        content={
          <ContextMenu
            hideMenu={hide}
            items={[
              {
                title: "Message",
                handler: startChat
              },
              canCall && {
                title: "Call",
                handler: call
              },
              canCopyEmail && {
                title: "Copy Email",
                handler: copyEmail
              },
              canRemoveFromChannel && {
                danger: true,
                title: "Remove From Channel",
                handler: removeFromChannel
              },
              canRemove && {
                danger: true,
                title: "Remove From Server",
                handler: removeUser
              }
            ]}
          />
        }
      >
        {children}
      </Tippy>
    </>
  );
}
