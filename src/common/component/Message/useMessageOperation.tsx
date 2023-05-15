import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DeleteMessageConfirm from "../DeleteMessageConfirm";
import ForwardModal from "../ForwardModal";
import PinMessageModal from "./PinMessageModal";
import { ContentTypes } from "../../../app/config";
import useCopy from "../../hook/useCopy";
import usePinMessage from "../../hook/usePinMessage";
import { useAppSelector } from "../../../app/store";
import { ChatContext } from "../../../types/common";

interface Params {
  mid: number;
  context: ChatContext;
  contextId: number;
}

export default function useMessageOperation({ mid, context, contextId }: Params) {
  const { copy } = useCopy();
  const { loginUser, message, channel } = useAppSelector((store) => {
    return {
      channel: context == "channel" ? store.channels.byId[contextId] : undefined,
      message: store.message[mid],
      loginUser: store.authData.user
    };
  });
  const { canPin, pins, unpinMessage, isUnpinSuccess } = usePinMessage(
    context == "channel" ? contextId : 0
  );
  const [mids, setMids] = useState<number[]>([]);
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [forwardModalVisible, setForwardModalVisible] = useState(false);
  const { content_type, properties, from_uid, content } = message ?? {};
  const toggleForwardModal = () => {
    // hideAll();
    setForwardModalVisible((prev) => !prev);
  };
  const toggleDeleteModal = () => {
    // hideAll();
    setDeleteModalVisible((prev) => !prev);
  };
  const togglePinModal = () => {
    // hideAll();
    setPinModalVisible((prev) => !prev);
  };
  const copyContent = (image = false) => {
    copy(content, image);
  };
  useEffect(() => {
    if (forwardModalVisible && content_type == ContentTypes.archive) {
      // forward message
      const forwardEle = document.querySelector(
        `[data-msg-mid='${mid}'] .down [data-forwarded-mids]`
      ) as HTMLDivElement;
      if (forwardEle) {
        const mids = forwardEle.dataset.forwardedMids?.split(",").map((m) => +m) || [];
        setMids(mids);
      }
    } else {
      setMids([mid]);
    }
  }, [mid, forwardModalVisible, content_type]);
  useEffect(() => {
    if (isUnpinSuccess) {
      toast.success("Unpin Message Successfully!");
    }
  }, [isUnpinSuccess]);
  const enablePin = context == "channel" && canPin;
  // const enableReply = currUid != from_uid;
  const isImage =
    content_type == ContentTypes.file &&
    !!properties?.content_type &&
    properties?.content_type.startsWith("image");
  const enableEdit =
    loginUser?.uid == from_uid && [ContentTypes.text, ContentTypes.markdown].includes(content_type);
  const canDelete = loginUser?.uid == from_uid || loginUser?.is_admin || (channel && channel.owner == loginUser?.uid);
  const canCopy = [ContentTypes.text, ContentTypes.markdown].includes(content_type) || isImage;
  return {
    copyContent: isImage ? copyContent.bind(null, true) : copyContent.bind(null, false),
    canCopy,
    isImage,
    isMarkdown: content_type == ContentTypes.markdown,
    canDelete,
    canPin: context == "channel" && canPin,
    pinned: enablePin ? pins.findIndex((p) => p.mid == mid) > -1 : false,
    unPin: unpinMessage,
    canReply: true,
    canEdit: enableEdit,
    toggleDeleteModal,
    toggleForwardModal,
    togglePinModal,
    DeleteModal: deleteModalVisible ? (
      <DeleteMessageConfirm closeModal={toggleDeleteModal} mids={mid} />
    ) : null,
    ForwardModal: forwardModalVisible ? (
      <ForwardModal mids={mids} closeModal={toggleForwardModal} />
    ) : null,
    PinModal: pinModalVisible ? (
      <PinMessageModal mid={mid} gid={contextId} closeModal={togglePinModal} />
    ) : null
  };
}
