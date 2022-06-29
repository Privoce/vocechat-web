import { useEffect } from "react";
import FileItem from "./FileItem";
import useUploadFile from "../../hook/useUploadFile";
import Modal from "../Modal";
import Button from "../styled/Button";
import StyledWrapper from "./styled";
import useSendMessage from "../../hook/useSendMessage";
import { useAppSelector } from "../../../app/store";

export default function UploadModal({ context = "user", sendTo = 0, files = [], closeModal }) {
  const from_uid = useAppSelector((store) => store.authData.user?.uid);
  const {
    sendMessage,
    isSuccess: sendMessageSuccess,
    isSending
  } = useSendMessage({
    context,
    from: from_uid,
    to: sendTo
  });
  const { data, uploadFile, progress, isUploading, isSuccess: uploadSuccess } = useUploadFile();
  const handleUpload = () => {
    const file = files[0];
    uploadFile(file);
  };
  useEffect(() => {
    if (uploadSuccess) {
      // 把已经上传的东西当做消息发出去
      const { path, ...rest } = data;
      sendMessage({
        type: "file",
        content: { path },
        properties: rest
      });
    }
  }, [uploadSuccess, data]);
  useEffect(() => {
    if (sendMessageSuccess) {
      closeModal();
    }
  }, [sendMessageSuccess]);

  if (!sendTo) return null;
  console.log("upload file modal", files, sendTo);
  const sending = isUploading || isSending;
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
            <Button className="upload" disabled={sending} onClick={handleUpload}>
              {sending ? `Uploading (${progress}%)` : `Upload`}
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
