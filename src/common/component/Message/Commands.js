import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
// import toast from "react-hot-toast";
import { updateSelectMessages } from "../../../app/slices/ui";
import { addReplyingMessage } from "../../../app/slices/message";
import StyledMenu from "../styled/Menu";
import Tooltip from "../../component/Tooltip";
import DeleteMessageConfirm from "../DeleteMessageConfirm";
import useFavMessage from "../../hook/useFavMessage";
import ReactionPicker from "./ReactionPicker";
import replyIcon from "../../../assets/icons/reply.svg?url";
import reactIcon from "../../../assets/icons/reaction.svg?url";
import editIcon from "../../../assets/icons/edit.svg?url";
import IconBookmark from "../../../assets/icons/bookmark.add.svg";
import moreIcon from "../../../assets/icons/more.svg?url";
import ForwardModal from "../ForwardModal";
import PinMessageModal from "./PinMessageModal";
import usePinMessage from "../../hook/usePinMessage";
import { ContentTypes } from "../../../app/config";
import toast from "react-hot-toast";
const StyledCmds = styled.ul`
  /* z-index: 9999; */
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
  content_type = ContentTypes.text,
  context = "user",
  contextId = 0,
  mid = 0,
  from_uid = 0,
  toggleEditMessage,
}) {
  const { addFavorite, isFavorited } = useFavMessage({
    cid: context == "channel" ? contextId : null,
  });
  const [mids, setMids] = useState([]);
  const dispatch = useDispatch();
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [forwardModalVisible, setForwardModalVisible] = useState(false);
  const [tippyVisible, setTippyVisible] = useState(false);
  const { canPin, pins, unpinMessage, isUnpinSuccess } = usePinMessage(
    context == "channel" ? contextId : undefined
  );
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
    console.log("midss", mids);
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
  const handleUnpin = () => {
    hideAll();
    unpinMessage(mid);
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
  useEffect(() => {
    if (isUnpinSuccess) {
      toast.success("Unpin Message Successfully!");
    }
  }, [isUnpinSuccess]);

  useEffect(() => {
    if (content_type == ContentTypes.archive) {
      // forward message
      const forwardEle = document.querySelector(
        `[data-msg-mid='${mid}'] .down [data-forwarded-mids]`
      );
      if (forwardEle) {
        const mids = forwardEle.dataset.forwardedMids.split(",");
        setMids(mids);
      }
    } else {
      setMids([mid]);
    }
  }, [mid, content_type]);

  const enablePin = context == "channel" && canPin;
  const enableEdit =
    currUid == from_uid &&
    [ContentTypes.text, ContentTypes.markdown].includes(content_type);
  const enableReply = currUid != from_uid;
  const pinned = enablePin ? pins.findIndex((p) => p.mid == mid) > -1 : false;
  return (
    <StyledCmds
      ref={cmdsRef}
      className={`cmds ${tippyVisible ? "visible" : ""}`}
    >
      <Tippy
        duration={0}
        delay={[0, 0]}
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
      {enableEdit && (
        <li className="cmd" onClick={toggleEditMessage}>
          <Tooltip placement="top" tip="Edit">
            <img src={editIcon} alt="icon edit" />
          </Tooltip>
        </li>
      )}
      {enableReply && (
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
        popperOptions={{ strategy: "fixed" }}
        placement="left-start"
        trigger="click"
        content={
          <StyledMenu className="menu">
            {/* <li className="item">Edit Message</li> */}
            {enablePin && (
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
        <DeleteMessageConfirm closeModal={toggleDeleteModal} mids={mid} />
      )}
      {forwardModalVisible && (
        <ForwardModal mids={mids} closeModal={toggleForwardModal} />
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
