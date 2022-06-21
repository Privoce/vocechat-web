import Tippy from "@tippyjs/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useMatch } from "react-router-dom";
import { useUpdateMuteSettingMutation } from "../../../app/services/contact";
import { useReadMessageMutation } from "../../../app/services/message";
import { removeUserSession } from "../../../app/slices/message.user";
import ContextMenu from "../../../common/component/ContextMenu";
import useContactOperation from "../../../common/hook/useContactOperation";

export default function SessionContextMenu({
  context = "user",
  id,
  visible,
  mid,
  hide,
  deleteChannel,
  setInviteChannelId,
  children
}) {
  const { canCopyEmail, copyEmail } = useContactOperation({ uid: context == "user" ? id : null });
  const [muteChannel] = useUpdateMuteSettingMutation();
  const [updateReadIndex] = useReadMessageMutation();
  const pathMatched = useMatch(`/chat/dm/${id}`);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { pathname } = useLocation();
  const { channelMuted } = useSelector((store) => {
    return {
      channelMuted: context == "channel" ? store.footprint.muteChannels[id] : false
    };
  });

  const handleChannelSetting = () => {
    navigateTo(`/setting/channel/${id}?f=${pathname}`);
  };

  const handleReadAll = () => {
    // console.log("last mid", mids, lastMid);
    if (mid) {
      const param =
        context == "user" ? { users: [{ uid: +id, mid }] } : { groups: [{ gid: +id, mid }] };
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

  const items =
    context == "user"
      ? [
          {
            title: "Mark As Read",
            handler: handleReadAll
          },
          canCopyEmail && {
            title: "Copy Email",
            handler: copyEmail
          },
          {
            title: "Hide Session",
            danger: true,
            handler: handleRemoveSession
          }
        ]
      : [
          {
            title: "Settings",
            underline: true,
            handler: handleChannelSetting
          },
          {
            title: "Mark As Read",
            // underline: true
            handler: handleReadAll
          },
          {
            title: channelMuted ? "Unmute" : "Mute",
            handler: handleChannelMute
          },
          {
            title: "Invite People",
            handler: setInviteChannelId.bind(null, id)
          },
          {
            title: "Delete Channel",
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
      content={<ContextMenu hideMenu={hide} items={items} />}
    >
      {children}
    </Tippy>
  );
}
