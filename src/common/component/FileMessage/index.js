import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import Styled from "./styled";
import Image from "./Image";
import useRemoveLocalMessage from "../../hook/useRemoveLocalMessage";
import useUploadFile from "../../hook/useUploadFile";
import useSendMessage from "../../hook/useSendMessage";
import Progress from "./Progress";
import { getFileIcon, formatBytes, isImage, getImageSize } from "../../utils";
import IconDownload from "../../../assets/icons/download.svg";
import IconClose from "../../../assets/icons/close.circle.svg";
dayjs.extend(relativeTime);
const isLocalFile = (content) => {
  return content && typeof content == "string" && content.startsWith("blob:");
};
export default function FileMessage({
  context = "",
  to = null,
  created_at,
  from_uid = null,
  content = "",
  download = "",
  thumbnail = "",
  properties = { local_id: 0, name: "", size: 0, content_type: "" },
}) {
  const [imageSize, setImageSize] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const removeLocalMessage = useRemoveLocalMessage({ context, id: to });
  const {
    sendMessage,
    isSuccess: sendMessageSuccess,
    isSending,
  } = useSendMessage({
    context,
    from: from_uid,
    to,
  });
  const {
    stopUploading,
    data,
    uploadFile,
    progress,
    isSuccess: uploadSuccess,
  } = useUploadFile();
  const fromUser = useSelector((store) => store.contacts.byId[from_uid]);
  const { size, name, content_type } = properties ?? {};
  useEffect(() => {
    const handleUpSend = async ({ url, name, type }) => {
      try {
        setUploadingFile(true);
        if (type.startsWith("image")) {
          const size = await getImageSize(url);
          setImageSize(size);
        }
        let file = await fetch(url)
          .then((r) => r.blob())
          .then((blobFile) => new File([blobFile], name, { type }));

        await uploadFile(file);
        setUploadingFile(false);
      } catch (error) {
        setUploadingFile(false);
        console.log("fetch local file error", error);
      }
    };
    // local file
    if (isLocalFile(content)) {
      handleUpSend({ url: content, name, type: content_type });
    }
  }, [content, name, content_type]);
  useEffect(() => {
    const props = properties ?? {};
    const propsV2 = imageSize ? { ...props, ...imageSize } : props;
    // 本地文件 并且上传成功
    if (uploadSuccess && isLocalFile(content)) {
      console.log(
        "send local file message",
        uploadSuccess,
        propsV2,
        data,
        content
      );
      // 把已经上传的东西当做消息发出去
      const { path } = data;
      sendMessage({
        ignoreLocal: true,
        type: "file",
        content: { path },
        properties: propsV2,
      });
    }
  }, [uploadSuccess, data, properties, content]);
  useEffect(() => {
    if (sendMessageSuccess) {
      //  回收本地资源
      URL.revokeObjectURL(content);
    }
  }, [sendMessageSuccess, content]);
  const handleCancel = () => {
    stopUploading();
    URL.revokeObjectURL(content);
    removeLocalMessage(properties.local_id);
  };
  if (!properties) return null;
  const icon = getFileIcon(content_type, name);

  if (!content || !name) return null;

  console.log("file content", content, name, content_type, size);
  const sending = uploadingFile || isSending;

  if (isImage(content_type, size))
    return (
      <Image
        uploading={sending}
        progress={progress}
        properties={{ ...imageSize, ...properties }}
        size={size}
        content={content}
        download={download}
        thumbnail={thumbnail}
      />
    );
  return (
    <Styled className={`file_message ${sending ? "sending" : ""}`}>
      <div className="basic">
        {icon}
        <div className="info">
          <span className="name">{name}</span>
          <span className="details">
            {/* <Progress value={30} width={"80%"} /> */}
            {sending ? (
              <Progress value={progress} width={"80%"} />
            ) : (
              <>
                <i className="size">{formatBytes(size)}</i>
                <i className="time">{dayjs(created_at).fromNow()}</i>
                {fromUser && (
                  <i className="from">
                    by <strong>{fromUser.name}</strong>
                  </i>
                )}
              </>
            )}
          </span>
        </div>
        {/* <IconClose className="cancel" /> */}
        {sending ? (
          <IconClose className="cancel" onClick={handleCancel} />
        ) : (
          <a
            className="download"
            download={name}
            href={`${content}&download=true`}
          >
            <IconDownload />
          </a>
        )}
      </div>
    </Styled>
  );
}
