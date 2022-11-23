import { useState, useRef, FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import toast from "react-hot-toast";
import { updateSelectMessages } from "../../../app/slices/ui";
import ContextMenu, { Item } from "../ContextMenu";
import Tooltip from "../Tooltip";
import useFavMessage from "../../hook/useFavMessage";
import useSendMessage from "../../hook/useSendMessage";
import ReactionPicker from "./ReactionPicker";
import replyIcon from "../../../assets/icons/reply.svg?url";
import reactIcon from "../../../assets/icons/reaction.svg?url";
import editIcon from "../../../assets/icons/edit.svg?url";
import IconBookmark from "../../../assets/icons/bookmark.add.svg";
import IconPin from "../../../assets/icons/pin.svg";
import IconForward from "../../../assets/icons/forward.svg";
import IconSelect from "../../../assets/icons/select.svg";
import IconDelete from "../../../assets/icons/delete.svg";
import moreIcon from "../../../assets/icons/more.svg?url";
import useMessageOperation from "./useMessageOperation";
import { useTranslation } from "react-i18next";

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
type Props = {
  context: "user" | "channel";
  contextId: number;
  mid: number;
  toggleEditMessage: () => void;
};
const Commands: FC<Props> = ({ context = "user", contextId = 0, mid = 0, toggleEditMessage }) => {
  const { t } = useTranslation();
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
    ForwardModal
  } = useMessageOperation({ mid, context, contextId });
  const { setReplying } = useSendMessage({ context, to: contextId });
  const { addFavorite, isFavorited } = useFavMessage({
    cid: context == "channel" ? contextId : null
  });
  const dispatch = useDispatch();
  const [tippyVisible, setTippyVisible] = useState(false);
  const cmdsRef = useRef(null);
  const handleReply = () => {
    if (contextId) {
      setReplying(mid);
    }
    hideAll();
  };

  const handleTippyVisible = (visible = true) => {
    setTippyVisible(visible);
  };
  const handleSelect = (mid: number) => {
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
      <StyledCmds ref={cmdsRef} className={`cmds ${tippyVisible ? "visible" : ""}`}>
        <Tippy
          onShow={handleTippyVisible.bind(null, true)}
          onHide={handleTippyVisible.bind(null, false)}
          interactive
          placement="left-start"
          trigger="click"
          content={<ReactionPicker mid={mid} hidePicker={hideAll} />}
        >
          <li className="cmd">
            <Tooltip placement="top" tip={t("action.add_reaction")}>
              <img src={reactIcon} className="toggler" alt="icon emoji" />
            </Tooltip>
          </li>
        </Tippy>
        {canEdit && (
          <li className="cmd" onClick={toggleEditMessage}>
            <Tooltip placement="top" tip={t("action.edit")}>
              <img src={editIcon} alt="icon edit" />
            </Tooltip>
          </li>
        )}
        {canReply && (
          <li className="cmd" onClick={handleReply}>
            <Tooltip placement="top" tip={t("action.reply")}>
              <img src={replyIcon} alt="icon reply" />
            </Tooltip>
          </li>
        )}
        <li className="cmd fav" onClick={handleAddFav}>
          <Tooltip placement="top" tip={t("action.add_to_fav")}>
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
            <ContextMenu
              items={
                [
                  canPin && {
                    title: pinned ? t("action.unpin") : t("action.pin"),
                    icon: <IconPin className="icon" />,
                    handler: pinned ? handleUnpin : togglePinModal
                  },
                  {
                    title: t("action.forward"),
                    icon: <IconForward className="icon" />,
                    handler: toggleForwardModal
                  },
                  {
                    title: t("action.select"),
                    icon: <IconSelect className="icon" />,
                    handler: handleSelect.bind(null, mid)
                  },
                  canDelete && {
                    title: t("action.remove"),
                    danger: true,
                    icon: <IconDelete className="icon" />,
                    handler: toggleDeleteModal
                  }
                ].filter(Boolean) as Item[]
              }
            />
          }
        >
          <li className="cmd">
            <Tooltip placement="top" tip={t("more")}>
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
};
export default Commands;
