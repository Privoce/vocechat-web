import { FC, ReactElement } from "react";
import Tippy from "@tippyjs/react";
import useContactOperation from "../../hook/useContactOperation";
import ContextMenu from "../ContextMenu";

interface Props {
  enable?: boolean;
  uid: number;
  cid?: number;
  visible: boolean;
  hide: () => void;
  children: ReactElement;
}

const ContactContextMenu: FC<Props> = ({ enable = false, uid, cid, visible, hide, children }) => {
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
  );
};

export default ContactContextMenu;
