import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import toast from "react-hot-toast";
import { useOutsideClick } from "rooks";
import { addReplyingMessage } from "../../../app/slices/message";
import StyledMenu from "../StyledMenu";
import DeleteMessageConfirm from "./DeleteMessageConfirm";
import EmojiPicker from "./EmojiPicker";
const StyledCmds = styled.ul`
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

  const handleReply = () => {
    if (contextId) {
      dispatch(addReplyingMessage({ id: contextId, mid }));
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
        <img
          src="https://static.nicegoodthings.com/project/rustchat/icon.reply.svg"
          alt="icon emoji"
        />
      </li>
      {emojiPopVisible && (
        <EmojiPicker mid={mid} hidePicker={toggleEmojiPopover} />
      )}
      {currUid == from_uid ? (
        <li className="cmd" onClick={toggleEditMessage}>
          <img
            src="https://static.nicegoodthings.com/project/rustchat/icon.edit.svg"
            alt="icon edit"
          />
        </li>
      ) : (
        <li className="cmd" onClick={handleReply}>
          <img
            src="https://static.nicegoodthings.com/project/rustchat/icon.forward.svg"
            alt="icon reply"
          />
        </li>
      )}
      <li className="cmd" onClick={toggleMenu}>
        <img
          src="https://static.nicegoodthings.com/project/rustchat/icon.dots.svg"
          alt="icon emoji"
        />
      </li>
      {menuVisible && (
        <StyledMenu className="menu" ref={menuRef}>
          {/* <li className="item">Edit Message</li> */}
          <li className="item underline">Pin Message</li>
          <li className="item">Reply</li>
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
