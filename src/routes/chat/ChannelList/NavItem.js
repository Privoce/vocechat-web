import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import useContextMenu from "../../../common/hook/useContextMenu";
import ContextMenu from "../../../common/component/ContextMenu";
import Tooltip from "../../../common/component/Tooltip";
// import { useDebounce} from "rooks";
import { useReadMessageMutation } from "../../../app/services/message";

import StyledLink from "./styled";
import { toggleChannelSetting } from "../../../app/slices/ui";
import ChannelIcon from "../../../common/component/ChannelIcon";
import { getUnreadCount } from "../utils";

const NavItem = ({ id, setFiles, toggleRemoveConfirm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateReadIndex] = useReadMessageMutation();

  const {
    visible: contextMenuVisible,
    offset,
    handleContextMenuEvent,
    hideContextMenu,
  } = useContextMenu();
  const { channel, mids, messageData, readIndex, loginUid } = useSelector(
    (store) => {
      return {
        channel: store.channels.byId[id],
        mids: store.channelMessage[id],
        messageData: store.message,
        loginUid: store.authData.uid,
        readIndex: store.footprint.readChannels[id],
      };
    }
  );
  const handleChannelSetting = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(toggleChannelSetting(id));
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
  const { is_public, name } = channel;
  const unreads = getUnreadCount({ mids, messageData, readIndex, loginUid });
  return (
    <Tippy
      interactive
      placement="right-start"
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
              title: "Mute",
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
        className={`link ${isActive ? "drop_over" : ""}`}
        to={`/chat/channel/${id}`}
      >
        <div className="name" title={name}>
          <ChannelIcon personal={!is_public} />
          <span className={`txt ${unreads == 0 ? "read" : ""}`}>{name}</span>
        </div>
        <div className="icons">
          <Tooltip placement="bottom" tip="Channel Setting">
            <i className="setting" onClick={handleChannelSetting}></i>
          </Tooltip>
          {unreads > 0 && (
            <i className={`badge ${unreads > 99 ? "dot" : ""}`}>
              {unreads > 99 ? null : unreads}
            </i>
          )}
        </div>
      </StyledLink>
    </Tippy>
  );
};

export default NavItem;
