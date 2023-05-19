import { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";

import { useReadMessageMutation } from "@/app/services/message";
import {
  usePinChatMutation,
  useUnpinChatMutation,
  useUpdateMuteSettingMutation
} from "@/app/services/user";
import { removeUserSession } from "@/app/slices/message.user";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import ContextMenu, { Item } from "@/components/ContextMenu";
import useUserOperation from "@/hooks/useUserOperation";

type Props = {
  context: ChatContext;
  pinned: boolean;
  id: number;
  visible: boolean;
  mid: number;
  hide: () => void;
  deleteChannel: (param: number) => void;
  setInviteChannelId: (param: number) => void;
  children: ReactElement;
};
const SessionContextMenu: FC<Props> = ({
  pinned,
  context = "dm",
  id,
  visible,
  mid,
  hide,
  deleteChannel,
  setInviteChannelId,
  children
}) => {
  const { t } = useTranslation();
  const { canCopyEmail, copyEmail, canDeleteChannel, canInviteChannel } = useUserOperation({
    uid: context == "dm" ? id : undefined,
    cid: context == "channel" ? id : undefined
  });
  const [muteChannel] = useUpdateMuteSettingMutation();
  const [pinChat] = usePinChatMutation();
  const [unpinChat] = useUnpinChatMutation();
  const [updateReadIndex] = useReadMessageMutation();
  const pathMatched = useMatch(`/chat/dm/${id}`);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { pathname } = useLocation();
  const { channelMuted } = useAppSelector((store) => {
    return {
      channelMuted: context == "channel" ? store.footprint.muteChannels[id] : false
    };
  });

  const handleChannelSetting = () => {
    navigateTo(`/setting/channel/${id}/overview?f=${pathname}`);
  };

  const handleReadAll = () => {
    if (mid) {
      const param =
        context == "dm" ? { users: [{ uid: +id, mid }] } : { groups: [{ gid: +id, mid }] };
      updateReadIndex(param);
    }
  };

  const handleRemoveSession = () => {
    dispatch(removeUserSession(id));
    if (pathMatched) {
      navigateTo("/chat");
    }
  };

  const handleChannelMute = () => {
    const data = channelMuted ? { remove_groups: [id] } : { add_groups: [{ gid: id }] };
    muteChannel(data);
  };
  const handlePinChat = () => {
    const data = context == "dm" ? { uid: id } : { gid: id };
    if (pinned) {
      unpinChat(data);
    } else {
      pinChat(data);
    }
  };
  const handleDMSetting = () => {
    navigateTo(`/setting/dm/${id}/overview?f=${pathname}`);
  };
  const pinTxt = t(pinned ? "unpin_chat" : "pin_chat", { ns: "chat" });

  const items =
    context == "dm"
      ? [
          {
            title: pinTxt,
            handler: handlePinChat
          },
          {
            title: t("action.mark_read"),
            handler: handleReadAll
          },
          {
            title: t("setting"),
            handler: handleDMSetting
          },
          canCopyEmail && {
            title: t("action.copy_email"),
            handler: copyEmail
          },
          {
            title: t("action.hide_session"),
            danger: true,
            handler: handleRemoveSession
          }
        ]
      : [
          {
            title: pinTxt,
            handler: handlePinChat
          },
          {
            title: t("setting"),
            underline: true,
            handler: handleChannelSetting
          },
          {
            title: t("action.mark_read"),
            // underline: true
            handler: handleReadAll
          },
          {
            title: channelMuted ? t("action.unmute") : t("action.mute"),
            handler: handleChannelMute
          },
          canInviteChannel && {
            title: t("action.invite_people"),
            handler: setInviteChannelId.bind(null, id)
          },
          canDeleteChannel && {
            title: t("action.delete_channel"),
            danger: true,
            handler: deleteChannel.bind(null, id)
          }
        ];
  return (
    <Tippy
      interactive
      placement="right-start"
      popperOptions={{ strategy: "fixed" }}
      followCursor={"initial"}
      visible={visible}
      onClickOutside={hide}
      content={<ContextMenu hideMenu={hide} items={items.filter(Boolean) as Item[]} />}
    >
      {children}
    </Tippy>
  );
};
export default SessionContextMenu;
