import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DeleteMessageConfirm from "../DeleteMessageConfirm";
import ForwardModal from "../ForwardModal";
import PinMessageModal from "./PinMessageModal";
import { ContentTypes } from "../../../app/config";
import { useSelector } from "react-redux";
import useCopy from "../../hook/useCopy";
import usePinMessage from "../../hook/usePinMessage";

export default function useMessageOperation({ mid, context, contextId }) {
  const [copied, copy] = useCopy();
  const { content_type, properties, currUid, from_uid, content } = useSelector(
    (store) => {
      return {
        content: store.message[mid]?.content,
        from_uid: store.message[mid]?.from_uid,
        content_type: store.message[mid]?.content_type,
        properties: store.message[mid]?.properties,
        currUid: store.authData.uid,
      };
    }
  );
  const { canPin, pins, unpinMessage, isUnpinSuccess } = usePinMessage(
    context == "channel" ? contextId : undefined
  );
  const [mids, setMids] = useState([]);
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [forwardModalVisible, setForwardModalVisible] = useState(false);

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
      );
      if (forwardEle) {
        console.log("ddddd", mid, forwardEle.dataset);
        const mids = forwardEle.dataset.forwardedMids.split(",");
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
  useEffect(() => {
    if (copied) {
      toast.success("Copied");
    }
  }, [copied]);
  const enablePin = context == "channel" && canPin;
  // const enableReply = currUid != from_uid;
  const isImage =
    content_type == ContentTypes.file &&
    properties?.content_type &&
    properties?.content_type.startsWith("image");
  const enableEdit =
    currUid == from_uid &&
    [ContentTypes.text, ContentTypes.markdown].includes(content_type);
  const canDelete = currUid == from_uid;
  const canCopy =
    [ContentTypes.text, ContentTypes.markdown].includes(content_type) ||
    isImage;
  return {
    copyContent: isImage ? copyContent.bind(null, true) : copyContent,
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
    ) : null,
  };
}
