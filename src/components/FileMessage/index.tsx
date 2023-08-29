import { FC, useEffect, useState } from "react";

import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import useExpiredResMap from "@/hooks/useExpiredResMap";
import useRemoveLocalMessage from "@/hooks/useRemoveLocalMessage";
import useSendMessage from "@/hooks/useSendMessage";
import useUploadFile from "@/hooks/useUploadFile";
import { getImageSize, isImage } from "@/utils";
import AudioMessage from "./AudioMessage";
import ExpiredMessage from "./ExpiredMessage";
import ImageMessage from "./ImageMessage";
import OtherFileMessage from "./OtherFileMessage";
import VideoMessage from "./VideoMessage";
import { shallowEqual } from "react-redux";

const isLocalFile = (content: string) => {
  return content.startsWith("blob:");
};

interface Props {
  context: ChatContext;
  to: number;
  created_at: number;
  from_uid: number;
  content: string;
  download: string;
  thumbnail: string;
  properties?: {
    local_id: number;
    name: string;
    size: number;
    content_type: string;
  };
}

const FileMessage: FC<Props> = ({
  context,
  to,
  created_at,
  from_uid,
  content = "",
  download = "",
  thumbnail = "",
  properties = { local_id: 0, name: "", size: 0, content_type: "" }
}) => {
  const { isExpired } = useExpiredResMap();
  const [imageSize, setImageSize] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const removeLocalMessage = useRemoveLocalMessage({ context, id: to });
  const {
    sendMessage,
    isSuccess: sendMessageSuccess,
    isSending
  } = useSendMessage({
    context,
    from: from_uid,
    to
  });
  const {
    stopUploading,
    data,
    uploadFile,
    progress,
    isSuccess: uploadSuccess,
    isError
  } = useUploadFile();
  const fromUser = useAppSelector((store) => store.users.byId[from_uid], shallowEqual);
  const { size = 0, name, content_type } = properties ?? {};
  useEffect(() => {
    const handleUpSend = async ({
      url,
      name,
      type
    }: {
      url: string;
      name: string;
      type: string;
    }) => {
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
        console.error("fetch local file error", error);
      }
    };
    // local file
    if (isLocalFile(content)) {
      handleUpSend({ url: content, name, type: content_type });
    }
  }, [content, name, content_type]);
  const handleCancel = () => {
    stopUploading();
    URL.revokeObjectURL(content);
    removeLocalMessage(properties.local_id);
  };
  useEffect(() => {
    if (isError) {
      // 撤回消息
      handleCancel();
    }
  }, [isError]);

  useEffect(() => {
    const props = properties ?? {};
    const propsV2 = imageSize ? { ...props, ...imageSize } : props;
    // 本地文件 并且上传成功
    if (uploadSuccess && isLocalFile(content)) {
      // 把已经上传的东西当做消息发出去
      const { path } = data;
      sendMessage({
        ignoreLocal: true,
        type: "file",
        content: { path },
        properties: propsV2
      });
    }
  }, [uploadSuccess, data, properties, content]);
  useEffect(() => {
    if (sendMessageSuccess) {
      //  回收本地资源
      URL.revokeObjectURL(content);
    }
  }, [sendMessageSuccess, content]);

  if (!properties) return null;

  if (!content || !name) return null;

  const sending = uploadingFile || isSending;
  // image
  if (isImage(content_type, size))
    return isExpired(thumbnail || content) ? (
      <ExpiredMessage type="image" />
    ) : (
      <ImageMessage
        key={properties?.local_id}
        uploading={sending}
        progress={progress}
        properties={{ ...imageSize, ...properties }}
        content={content}
        download={download}
        thumbnail={thumbnail}
      />
    );
  const isVideo = content_type.startsWith("video");
  const isAudio = content_type.startsWith("audio");
  if (isExpired(content) && !sending)
    return <ExpiredMessage type={isAudio ? "audio" : isVideo ? "video" : "file"} />;
  // video
  if (isVideo && !sending)
    return <VideoMessage size={size} url={content} name={name} download={download} />;
  // audio
  if (isAudio && !sending)
    return <AudioMessage size={size} url={content} name={name} download={download} />;
  return (
    <OtherFileMessage
      created_at={created_at}
      from_user={fromUser}
      name={name}
      size={size}
      progress={progress}
      sending={sending}
      content={content}
      content_type={content_type}
      handleCancel={handleCancel}
    />
  );
};

export default FileMessage;
