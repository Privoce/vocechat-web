import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import toast from "react-hot-toast";
import { useOutsideClick } from "rooks";
import { addReplyingMessage } from "../../../app/slices/message";
import StyledMenu from "../StyledMenu";
import DeleteMessageConfirm from "./DeleteMessageConfirm";
import EmojiPicker from "./EmojiPicker";
import replyIcon from "../../../assets/icons/reply.svg?url";
import reactIcon from "../../../assets/icons/reaction.svg?url";
import editIcon from "../../../assets/icons/edit.svg?url";
import moreIcon from "../../../assets/icons/more.svg?url";
const StyledCmds = styled.ul`
  z-index: 9999;
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
    img {
      width: 24px;
      height: 24px;
    }
  }
  > .picker {
    position: absolute;
    left: -10px;
    top: 0;
    transform: translateX(-100%);
  }
  .menu {
    position: absolute;
    top: 0;
    right: 36px;
  }
`;
export default function Commands({
  contextId = 0,
  mid = 0,
  from_uid = 0,
  menuVisible,
  toggleMenu,
  emojiPopVisible,
  toggleEmojiPopover,
  toggleEditMessage,
}) {
  const dispatch = useDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const currUid = useSelector((store) => store.authData.uid);
  const menuRef = useRef(null);

  const handleReply = (fromMenu = false) => {
    if (contextId) {
      dispatch(addReplyingMessage({ id: contextId, mid }));
    }
    if (fromMenu) {
      toggleMenu();
    }
    // toast.success("cooming soon");
  };

  useOutsideClick(menuRef, toggleMenu);
  const toggleDeleteModal = () => {
    setDeleteModalVisible((prev) => !prev);
  };
  const alwaysVisible = menuVisible || emojiPopVisible;
  return (
    <StyledCmds className={`cmds ${alwaysVisible ? "visible" : ""}`}>
      <li className="cmd" onClick={toggleEmojiPopover}>
        <img src={reactIcon} alt="icon emoji" />
      </li>
      {emojiPopVisible && (
        <div className="picker">
          <EmojiPicker mid={mid} hidePicker={toggleEmojiPopover} />
        </div>
      )}
      {currUid == from_uid ? (
        <li className="cmd" onClick={toggleEditMessage}>
          <img src={editIcon} alt="icon edit" />
        </li>
      ) : (
        <li className="cmd" onClick={handleReply.bind(null, false)}>
          <img src={replyIcon} alt="icon reply" />
        </li>
      )}
      <li className="cmd" onClick={toggleMenu}>
        <img src={moreIcon} alt="icon emoji" />
      </li>
      {menuVisible && (
        <StyledMenu className="menu" ref={menuRef}>
          {/* <li className="item">Edit Message</li> */}
          <li className="item underline">Pin Message</li>
          <li className="item" onClick={handleReply.bind(null, true)}>
            Reply
          </li>
          {currUid == from_uid && (
            <li className="item danger" onClick={toggleDeleteModal}>
              Delete Message
            </li>
          )}
        </StyledMenu>
      )}
      {deleteModalVisible && (
        <DeleteMessageConfirm closeModal={toggleDeleteModal} mid={mid} />
      )}
    </StyledCmds>
  );
}
