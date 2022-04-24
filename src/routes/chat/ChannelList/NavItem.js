import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import useContextMenu from "../../../common/hook/useContextMenu";
import ContextMenu from "../../../common/component/ContextMenu";
import InviteModal from "../../../common/component/ChannelInviteModal";
import Tooltip from "../../../common/component/Tooltip";
// import { useDebounce} from "rooks";
import { useReadMessageMutation } from "../../../app/services/message";
import { useUpdateMuteSettingMutation } from "../../../app/services/contact";

import StyledLink from "./styled";
import ChannelIcon from "../../../common/component/ChannelIcon";
import { getUnreadCount } from "../utils";

const NavItem = ({ id, setFiles, toggleRemoveConfirm }) => {
  const { pathname } = useLocation();
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const navigate = useNavigate();
  const [muteChannel] = useUpdateMuteSettingMutation();
  const [updateReadIndex] = useReadMessageMutation();

  const {
    visible: contextMenuVisible,
    offset,
    handleContextMenuEvent,
    hideContextMenu,
  } = useContextMenu();
  const {
    channel,
    mids,
    messageData,
    readIndex,
    muted,
    loginUid,
    loginUser,
  } = useSelector((store) => {
    return {
      loginUser: store.contacts.byId[store.authData.uid],
      channel: store.channels.byId[id],
      mids: store.channelMessage[id],
      messageData: store.message,
      loginUid: store.authData.uid,
      readIndex: store.footprint.readChannels[id],
      muted: store.footprint.muteChannels[id],
    };
  });
  const handleChannelSetting = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const { id } = evt.target.dataset;
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
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));
  const handleReadAll = () => {
    const lastMid = mids[mids.length - 1];
    console.log("last mid", mids, lastMid);
    if (lastMid) {
      const param = { groups: [{ gid: id, mid: lastMid }] };
      updateReadIndex(param);
    }
  };
  const toggleInviteModalVisible = (evt) => {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    setInviteModalVisible((prev) => !prev);
  };
  const handleMute = () => {
    const data = muted
      ? { remove_groups: [id] }
      : { add_groups: [{ gid: id }] };
    muteChannel(data);
  };
  const { is_public, name, owner } = channel;
  const { unreads = 0, mentions = [] } = getUnreadCount({
    mids,
    messageData,
    readIndex,
    loginUid,
  });
  const isMentions = mentions.length !== 0;
  const inviteIconVisible = loginUser?.is_admin || owner == loginUid;
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
                handler: handleReadAll,
              },
              {
                title: muted ? "Unmute" : "Mute",
                handler: handleMute,
              },
              {
                title: "Notification Settings",
                underline: true,
              },
              is_public
                ? null
                : {
                    title: "Invite People",
                  },
              {
                title: "Delete Channel",
                danger: true,
                handler: toggleRemoveConfirm.bind(null, id),
              },
            ]}
          />
        }
      >
        <StyledLink
          data-cid={id}
          onContextMenu={handleContextMenuEvent}
          ref={drop}
          key={id}
          className={`link ${isActive ? "drop_over" : ""} ${
            muted ? "muted" : ""
          }`}
          to={`/chat/channel/${id}`}
        >
          <div className={`name`} title={name}>
            <ChannelIcon personal={!is_public} muted={muted} />
            <span className={`txt ${unreads == 0 ? "read" : ""}`}>{name}</span>
          </div>
          <div className="icons">
            {inviteIconVisible && (
              <Tooltip placement="bottom" tip="Add Member">
                <i
                  className="icon invite"
                  data-id={id}
                  onClick={toggleInviteModalVisible}
                ></i>
              </Tooltip>
            )}
            <Tooltip placement="bottom" tip="Channel Setting">
              <i
                className="icon setting"
                data-id={id}
                onClick={handleChannelSetting}
              ></i>
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
          cid={id}
          title={channel.name}
          closeModal={toggleInviteModalVisible}
        />
      )}
    </>
  );
};

export default NavItem;
