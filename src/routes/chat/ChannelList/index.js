import { useState } from "react";
import { useSelector } from "react-redux";
import useContextMenu from "../../../common/hook/useContextMenu";
import ContextMenu from "../../../common/component/ContextMenu";
import DeleteConfirmModal from "../../../common/component/ChannelSetting/DeleteConfirmModal";
import NavItem from "./NavItem";

export default function ChannelList({ setDropFiles }) {
  const [removeConfirmVisible, setRemoveConfirmVisible] = useState(false);
  const [currId, setCurrId] = useState(null);
  const { channelIds, channelData } = useSelector((store) => {
    return { channelIds: store.channels.ids, channelData: store.channels.byId };
  });
  const {
    visible: contextMenuVisible,
    posX,
    posY,
    hideContextMenu,
    handleContextMenuEvent,
  } = useContextMenu();
  const handleContextMenuClick = (evt, id) => {
    console.log("wtf", evt, id);
    setCurrId(id);
    handleContextMenuEvent(evt);
  };
  const toggleRemoveConfirm = () => {
    setRemoveConfirmVisible((prev) => !prev);
  };
  const { is_public } = channelData[currId] || {};
  return (
    <>
      {channelIds.map((cid) => {
        return (
          <NavItem
            contextMenuEventHandler={handleContextMenuClick}
            key={cid}
            id={cid}
            setFiles={setDropFiles}
          />
        );
      })}
      {contextMenuVisible ? (
        <ContextMenu
          hideMenu={hideContextMenu}
          posX={posX}
          posY={posY}
          items={[
            {
              title: "Mark As Read",
              underline: true,
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
              handler: toggleRemoveConfirm,
            },
          ]}
        />
      ) : null}
      {removeConfirmVisible && (
        <DeleteConfirmModal id={currId} closeModal={toggleRemoveConfirm} />
      )}
    </>
  );
}
