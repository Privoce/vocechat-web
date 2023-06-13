import { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";

import useUserOperation from "@/hooks/useUserOperation";
import ContextMenu, { Item } from "../ContextMenu";

interface Props {
  enable?: boolean;
  uid: number;
  cid?: number;
  visible: boolean;
  hide: () => void;
  children: ReactElement;
}

const UserContextMenu: FC<Props> = ({ enable = false, uid, cid, visible, hide, children }) => {
  const { t } = useTranslation("member");
  const { t: chatTran } = useTranslation("chat");
  const {
    blockThisContact,
    removeFromContact,
    copyEmail,
    canCopyEmail,
    startChat,
    canRemove,
    canRemoveFromContact,
    canBlock,
    canRemoveFromChannel,
    removeFromChannel,
    removeUser,
    isAdmin,
    canUpdateRole,
    updateRole
  } = useUserOperation({
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
          items={
            [
              {
                title: t("send_msg"),
                handler: startChat
              },
              canCopyEmail && {
                title: t("copy_email"),
                handler: copyEmail
              },
              canUpdateRole && {
                title: t("roles"),
                handler: updateRole,
                subs: [
                  {
                    title: t("set_normal"),
                    checked: !isAdmin,
                    handler: updateRole
                  },
                  {
                    title: t("set_admin"),
                    checked: isAdmin,
                    handler: updateRole
                  }
                ]
              },
              canRemoveFromChannel && {
                danger: true,
                title: t("remove_from_channel"),
                handler: removeFromChannel
              },
              canRemoveFromContact && {
                danger: true,
                title: t("remove_from_contact"),
                handler: removeFromContact
              },
              canBlock && {
                danger: true,
                title: chatTran("block"),
                handler: blockThisContact
              },
              canRemove && {
                danger: true,
                title: t("remove"),
                handler: removeUser
              }
            ].filter(Boolean) as Item[]
          }
        />
      }
    >
      {children}
    </Tippy>
  );
};

export default UserContextMenu;
