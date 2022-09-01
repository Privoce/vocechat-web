import { useState, FC, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import Tippy from "@tippyjs/react";
import useContextMenu from "../../../common/hook/useContextMenu";
import ContextMenu from "../../../common/component/ContextMenu";
import InviteModal from "../../../common/component/InviteModal";
import Tooltip from "../../../common/component/Tooltip";
import IconSetting from "../../../assets/icons/setting.svg";
import IconInvite from "../../../assets/icons/invite.from.channel.svg";
import { useReadMessageMutation } from "../../../app/services/message";
import { useUpdateMuteSettingMutation } from "../../../app/services/user";
import StyledLink from "./styled";
import ChannelIcon from "../../../common/component/ChannelIcon";
import { getUnreadCount } from "../utils";
import { useAppSelector } from "../../../app/store";
interface IProps {
  id: number;
  setFiles: (files: File[]) => void;
  toggleRemoveConfirm: (id: number) => void;
}
const NavItem: FC<IProps> = ({ id, setFiles, toggleRemoveConfirm }) => {
  const { pathname } = useLocation();
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const navigate = useNavigate();
  const [muteChannel] = useUpdateMuteSettingMutation();
  const [updateReadIndex] = useReadMessageMutation();

  const {
    visible: contextMenuVisible,
    offset,
    handleContextMenuEvent,
    hideContextMenu
  } = useContextMenu();
  const {
    channel,
    mids = [],
    messageData,
    readIndex,
    muted,
    loginUid = 0
  } = useAppSelector((store) => {
    return {
      channel: store.channels.byId[id],
      mids: store.channelMessage[id],
      messageData: store.message,
      loginUid: store.authData.user?.uid,
      readIndex: store.footprint.readChannels[id],
      muted: store.footprint.muteChannels[id]
    };
  });
  const handleChannelSetting = (evt: MouseEvent<SVGElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    const { id } = evt.currentTarget.dataset;
    if (id) {
      navigate(`/setting/channel/${id}?f=${pathname}`);
    }
  };
  const [{ isActive }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop({ dataTransfer }) {
      if (dataTransfer.files.length) {
        // console.log(files, rest);
        setFiles([...dataTransfer.files]);
        navigate(`/chat/channel/${id}`);
        // 重置
        setTimeout(() => {
          setFiles([]);
        }, 300);
      }
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver()
    })
  }));
  const handleReadAll = () => {
    const lastMid = mids[mids.length - 1];
    if (lastMid) {
      const param = { groups: [{ gid: id, mid: lastMid }] };
      updateReadIndex(param);
    }
  };
  const toggleInviteModalVisible = (evt?: Event) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    setInviteModalVisible((prev) => !prev);
  };
  const handleMute = () => {
    const data = muted ? { remove_groups: [id] } : { add_groups: [{ gid: id }] };
    muteChannel(data);
  };
  if (!channel) return null;
  const { is_public, name, owner } = channel;
  const { unreads = 0, mentions = [] } = getUnreadCount({
    mids,
    messageData,
    readIndex,
    loginUid
  });
  const isMentions = mentions.length !== 0;
  const inviteIconVisible = is_public || owner == loginUid;
  return (
    <>
      <Tippy
        interactive
        placement="right-start"
        popperOptions={{ strategy: "fixed" }}
        offset={[offset.y, offset.x]}
        visible={contextMenuVisible}
        onClickOutside={hideContextMenu}
        key={id}
        content={
          <ContextMenu
            hideMenu={hideContextMenu}
            items={[
              {
                title: "Mark As Read",
                underline: true,
                handler: handleReadAll
              },
              {
                title: muted ? "Unmute" : "Mute",
                handler: handleMute
              },
              {
                title: "Invite People",
                handler: toggleInviteModalVisible
              },
              {
                title: "Delete Channel",
                danger: true,
                handler: toggleRemoveConfirm.bind(null, id)
              }
            ]}
          />
        }
      >
        <StyledLink
          data-cid={id}
          onContextMenu={handleContextMenuEvent}
          ref={drop}
          key={id}
          className={`link ${isActive ? "drop_over" : ""} ${muted ? "muted" : ""}`}
          activeclassname="link_active"
          to={`/chat/channel/${id}`}
        >
          <div className={`name`} title={name}>
            <ChannelIcon personal={!is_public} muted={!!muted} />
            <span className={`txt ${unreads == 0 ? "read" : ""}`}>{name}</span>
          </div>
          <div className="icons">
            {inviteIconVisible && (
              <Tooltip placement="bottom" tip="Add Member">
                <IconInvite
                  className="icon invite"
                  data-id={id}
                  onClick={toggleInviteModalVisible}
                ></IconInvite>
              </Tooltip>
            )}
            <Tooltip placement="bottom" tip="Channel Setting">
              <IconSetting
                className="icon setting"
                data-id={id}
                onClick={handleChannelSetting}
              ></IconSetting>
            </Tooltip>
            {unreads > 0 && (
              <i className={`badge ${isMentions ? "mention" : ""}`}>
                {isMentions ? mentions.length : unreads}
              </i>
            )}
          </div>
        </StyledLink>
      </Tippy>
      {inviteModalVisible && (
        <InviteModal
          type="channel"
          cid={id}
          title={channel?.name}
          closeModal={toggleInviteModalVisible}
        />
      )}
    </>
  );
};

export default NavItem;
