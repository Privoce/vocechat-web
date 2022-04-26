import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
// import toast from "react-hot-toast";
import { updateSelectMessages } from "../../../app/slices/ui";
import { addReplyingMessage } from "../../../app/slices/message";
import StyledMenu from "../styled/Menu";
import Tooltip from "../../component/Tooltip";
import DeleteMessageConfirm from "./DeleteMessageConfirm";
import EmojiPicker from "./EmojiPicker";
import replyIcon from "../../../assets/icons/reply.svg?url";
import reactIcon from "../../../assets/icons/reaction.svg?url";
import editIcon from "../../../assets/icons/edit.svg?url";
// import bookmarkIcon from "../../../assets/icons/bookmark.svg?url";
import moreIcon from "../../../assets/icons/more.svg?url";
import ForwardModal from "../ForwardModal";
import PinMessageModal from "./PinMessageModal";
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
`;
export default function Commands({
  context = "user",
  contextId = 0,
  mid = 0,
  from_uid = 0,
  toggleEditMessage,
}) {
  const dispatch = useDispatch();
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [forwardModalVisible, setForwardModalVisible] = useState(false);
  const [tippyVisible, setTippyVisible] = useState(false);
  const currUid = useSelector((store) => store.authData.uid);
  const cmdsRef = useRef(null);
  const handleReply = (fromMenu) => {
    if (contextId) {
      dispatch(addReplyingMessage({ id: contextId, mid }));
    }
    if (fromMenu) {
      hideAll();
    }
  };
  const toggleForwardModal = () => {
    hideAll();
    setForwardModalVisible((prev) => !prev);
  };
  const toggleDeleteModal = () => {
    hideAll();
    setDeleteModalVisible((prev) => !prev);
  };
  const togglePinModal = () => {
    hideAll();
    setPinModalVisible((prev) => !prev);
  };
  const handleTippyVisible = (visible = true) => {
    setTippyVisible(visible);
  };
  const handleSelect = (mid) => {
    dispatch(updateSelectMessages({ context, id: contextId, data: mid }));
    hideAll();
  };
  return (
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
        content={<EmojiPicker mid={mid} hidePicker={hideAll} />}
      >
        <li className="cmd">
          <Tooltip placement="top" tip="Add Reaction">
            <img src={reactIcon} className="toggler" alt="icon emoji" />
          </Tooltip>
        </li>
      </Tippy>
      {currUid == from_uid ? (
        <li className="cmd" onClick={toggleEditMessage}>
          <Tooltip placement="top" tip="Edit">
            <img src={editIcon} alt="icon edit" />
          </Tooltip>
        </li>
      ) : (
        <li className="cmd" onClick={handleReply}>
          <Tooltip placement="top" tip="Reply">
            <img src={replyIcon} alt="icon reply" />
          </Tooltip>
        </li>
      )}
      {/* <li className="cmd">
        <Tooltip placement="top" tip="Add to Favorites">
          <img src={bookmarkIcon} className="toggler" alt="icon bookmark" />
        </Tooltip>
      </li> */}
      <Tippy
        onShow={handleTippyVisible.bind(null, true)}
        onHide={handleTippyVisible.bind(null, false)}
        interactive
        popperOptions={{ strategy: "fixed" }}
        placement="left-start"
        trigger="click"
        content={
          <StyledMenu className="menu">
            {/* <li className="item">Edit Message</li> */}
            {context == "channel" && (
              <li className="item underline" onClick={togglePinModal}>
                Pin Message
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
            {currUid == from_uid && (
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

      {deleteModalVisible && (
        <DeleteMessageConfirm closeModal={toggleDeleteModal} mid={mid} />
      )}
      {forwardModalVisible && (
        <ForwardModal mids={[mid]} closeModal={toggleForwardModal} />
      )}
      {pinModalVisible && (
        <PinMessageModal
          mid={mid}
          gid={contextId}
          closeModal={togglePinModal}
        />
      )}
    </StyledCmds>
  );
}
