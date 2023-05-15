import { FC, ReactElement } from "react";
import Tippy from "@tippyjs/react";
import { useDispatch } from "react-redux";
import ContextMenu, { Item } from "../ContextMenu";
import IconDelete from "../../../assets/icons/delete.svg";
import IconEdit from "../../../assets/icons/edit.svg";
import IconReply from "../../../assets/icons/reply.svg";
import IconForward from "../../../assets/icons/forward.svg";
import IconPin from "../../../assets/icons/pin.svg";
import IconCopy from "../../../assets/icons/copy.svg";
import IconSelect from "../../../assets/icons/select.svg";
import { updateSelectMessages } from "../../../app/slices/ui";
import useSendMessage from "../../hook/useSendMessage";
import useMessageOperation from "./useMessageOperation";
import { useTranslation } from "react-i18next";
import { ChatContext } from "../../../types/common";
type Props = {
  context: ChatContext;
  contextId: number;
  mid: number;
  visible: boolean;
  hide: () => void;
  editMessage: () => void;
  children: ReactElement;
};
const MessageContextMenu: FC<Props> = ({
  context,
  contextId,
  mid,
  visible,
  hide,
  editMessage,
  children
}) => {
  const { t } = useTranslation();
  const {
    copyContent,
    canEdit,
    canPin,
    canDelete,
    canCopy,
    canReply,
    pinned,
    unPin,
    toggleDeleteModal,
    toggleForwardModal,
    togglePinModal,
    PinModal,
    ForwardModal,
    DeleteModal
  } = useMessageOperation({ mid, contextId, context });
  const dispatch = useDispatch();
  const { setReplying } = useSendMessage({ context, to: contextId });
  const handleSelect = () => {
    dispatch(updateSelectMessages({ context, id: contextId, data: mid }));
  };
  const handleReply = () => {
    if (contextId) {
      setReplying(mid);
    }
  };
  const items = [
    canEdit && {
      title: t("action.edit_msg"),
      icon: <IconEdit className="icon" />,
      handler: editMessage
    },
    canReply && {
      title: t("action.reply"),
      icon: <IconReply className="icon" />,
      handler: handleReply
    },
    canCopy && {
      title: t("action.copy"),
      icon: <IconCopy className="icon" />,
      handler: copyContent
    },
    canPin && {
      title: pinned ? t("action.unpin") : t("action.pin"),
      icon: <IconPin className="icon" />,
      handler: pinned ? unPin.bind(null, mid) : togglePinModal
    },
    {
      title: t("action.forward"),
      icon: <IconForward className="icon" />,
      handler: toggleForwardModal
    },
    {
      title: t("action.select"),
      icon: <IconSelect className="icon" />,
      handler: handleSelect
    },
    canDelete && {
      title: t("action.remove"),
      danger: true,
      icon: <IconDelete className="icon" />,
      handler: toggleDeleteModal
    }
  ].filter((v) => typeof v !== "boolean" && "title" in (v ?? {})) as Item[];
  return (
    <>
      {ForwardModal}
      {PinModal}
      {DeleteModal}
      <Tippy
        visible={visible}
        followCursor={"initial"}
        interactive
        placement="right-start"
        popperOptions={{ strategy: "fixed" }}
        onClickOutside={hide}
        key={mid}
        content={<ContextMenu hideMenu={hide} items={items} />}
      >
        {children}
      </Tippy>
    </>
  );
};
export default MessageContextMenu;
