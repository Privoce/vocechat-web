import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import { updateSelectMessages } from "../../../app/slices/ui";
import { addReplyingMessage } from "../../../app/slices/message";
import StyledMenu from "../styled/Menu";
import Tooltip from "../../component/Tooltip";

import useFavMessage from "../../hook/useFavMessage";
import ReactionPicker from "./ReactionPicker";
import replyIcon from "../../../assets/icons/reply.svg?url";
import reactIcon from "../../../assets/icons/reaction.svg?url";
import editIcon from "../../../assets/icons/edit.svg?url";
import IconBookmark from "../../../assets/icons/bookmark.add.svg";
import moreIcon from "../../../assets/icons/more.svg?url";
import toast from "react-hot-toast";
import useMessageOperation from "./useMessageOperation";
const StyledCmds = styled.ul`
  z-index: 999;
  position: absolute;
  right: 10px;
  top: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  background-color: #fff;
  visibility: hidden;
  &.visible {
    visibility: visible;
  }
  .cmd {
    display: flex;
    cursor: pointer;
    padding: 4px;
    &:hover {
      background-color: #f3f4f6;
    }
    img,
    svg {
      width: 24px;
      height: 24px;
    }
    &.fav {
      svg path {
        fill: #667085;
      }
    }
  }
  > .picker {
    position: absolute;
    left: -10px;
    top: 0;
    transform: translateX(-100%);
  }
`;
export default function Commands({
  context = "user",
  contextId = 0,
  mid = 0,
  toggleEditMessage,
}) {
  const {
    canDelete,
    canReply,
    canEdit,
    canPin,
    unPin,
    pinned,
    toggleDeleteModal,
    toggleForwardModal,
    togglePinModal,
    PinModal,
    DeleteModal,
    ForwardModal,
  } = useMessageOperation({ mid, context, contextId });
  const { addFavorite, isFavorited } = useFavMessage({
    cid: context == "channel" ? contextId : null,
  });
  const dispatch = useDispatch();
  const [tippyVisible, setTippyVisible] = useState(false);
  const cmdsRef = useRef(null);
  const handleReply = (fromMenu) => {
    if (contextId) {
      dispatch(addReplyingMessage({ id: contextId, mid }));
    }
    if (fromMenu) {
      hideAll();
    }
  };

  const handleTippyVisible = (visible = true) => {
    setTippyVisible(visible);
  };
  const handleSelect = (mid) => {
    dispatch(updateSelectMessages({ context, id: contextId, data: mid }));
    hideAll();
  };
  const handleUnpin = () => {
    hideAll();
    unPin(mid);
  };
  const handleAddFav = async () => {
    hideAll();
    const faved = isFavorited(mid);
    if (faved) {
      toast.success("Favorited!");
      return;
    }
    const added = await addFavorite(mid);
    if (added) {
      toast.success("Added Favorites!");
    } else {
      toast.error("Added Favorites Failed!");
    }
  };

  return (
    <>
      <StyledCmds
        ref={cmdsRef}
        className={`cmds ${tippyVisible ? "visible" : ""}`}
      >
        <Tippy
          onShow={handleTippyVisible.bind(null, true)}
          onHide={handleTippyVisible.bind(null, false)}
          interactive
          placement="left-start"
          trigger="click"
          content={<ReactionPicker mid={mid} hidePicker={hideAll} />}
        >
          <li className="cmd">
            <Tooltip placement="top" tip="Add Reaction">
              <img src={reactIcon} className="toggler" alt="icon emoji" />
            </Tooltip>
          </li>
        </Tippy>
        {canEdit && (
          <li className="cmd" onClick={toggleEditMessage}>
            <Tooltip placement="top" tip="Edit">
              <img src={editIcon} alt="icon edit" />
            </Tooltip>
          </li>
        )}
        {canReply && (
          <li className="cmd" onClick={handleReply}>
            <Tooltip placement="top" tip="Reply">
              <img src={replyIcon} alt="icon reply" />
            </Tooltip>
          </li>
        )}
        <li className="cmd fav" onClick={handleAddFav}>
          <Tooltip placement="top" tip="Add to Favorites">
            <IconBookmark />
          </Tooltip>
        </li>
        <Tippy
          onShow={handleTippyVisible.bind(null, true)}
          onHide={handleTippyVisible.bind(null, false)}
          interactive
          placement="left-start"
          trigger="click"
          content={
            <StyledMenu className="menu">
              {canPin && (
                <li
                  className="item"
                  onClick={pinned ? handleUnpin : togglePinModal}
                >
                  {pinned ? `Unpin Message` : `Pin Message`}
                </li>
              )}
              <li className="item" onClick={toggleForwardModal}>
                Forward
              </li>
              <li className="item" onClick={handleReply.bind(null, true)}>
                Reply
              </li>
              <li className="item" onClick={handleSelect.bind(null, mid)}>
                Select
              </li>
              {canDelete && (
                <li className="item danger" onClick={toggleDeleteModal}>
                  Delete Message
                </li>
              )}
            </StyledMenu>
          }
        >
          <li className="cmd">
            <Tooltip placement="top" tip="More">
              <img src={moreIcon} alt="icon more" />
            </Tooltip>
          </li>
        </Tippy>
      </StyledCmds>
      {PinModal}
      {ForwardModal}
      {DeleteModal}
    </>
  );
}
