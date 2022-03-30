import { useEffect } from "react";
import { useSelector } from "react-redux";
import FileItem from "./FileItem";
import useSendImageMessage from "../../hook/useSendImageMessage";
import useSendFileMessage from "../../hook/useSendFileMessage";
import Modal from "../Modal";
import Button from "../styled/Button";
import { isTreatAsImage } from "../../utils";
import StyledWrapper from "./styled";

export default function UploadModal({
  context = "user",
  sendTo = 0,
  files = [],
  closeModal,
}) {
  const from_uid = useSelector((store) => store.authData.uid);
  const {
    sendImageMessage,
    isSending: isSendingImage,
    isSuccess: sendImageSuccess,
  } = useSendImageMessage({
    context,
    from: from_uid,
    to: sendTo,
  });
  const {
    sendFileMessage,
    progress,
    isSending: isSendingFile,
    isSuccess: sendFileSuccess,
  } = useSendFileMessage({
    context,
    from: from_uid,
    to: sendTo,
  });
  const handleUpload = () => {
    const file = files[0];
    // const { type } = file;
    if (isTreatAsImage(file)) {
      sendImageMessage(file);
    } else {
      sendFileMessage(file);
    }
  };
  useEffect(() => {
    if (sendFileSuccess || sendImageSuccess) {
      closeModal();
    }
  }, [sendImageSuccess, sendFileSuccess]);

  if (!sendTo) return null;
  console.log("upload file modal", files, sendTo);
  const isSending = isSendingFile || isSendingImage;
  return (
    <Modal>
      <StyledWrapper
        title={"Upload a file"}
        description="Photos accept jpg, png, max size limit to 10M."
        buttons={
          <>
            <Button className="cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              className="upload"
              disabled={isSending}
              onClick={handleUpload}
            >
              {isSending
                ? `Uploading (${Math.floor(progress * 100)}%)`
                : `Upload`}
            </Button>
          </>
        }
      >
        <ul className="list">
          {files.map((f, idx) => {
            console.log({ f });
            return <FileItem key={idx} file={f} />;
          })}
        </ul>
      </StyledWrapper>
    </Modal>
  );
}
