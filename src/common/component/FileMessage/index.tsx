import { FC, useEffect, useState } from "react";
import ImageMessage from "./ImageMessage";
import useRemoveLocalMessage from "../../hook/useRemoveLocalMessage";
import useUploadFile from "../../hook/useUploadFile";
import useSendMessage from "../../hook/useSendMessage";
import Progress from "./Progress";
import { getFileIcon, formatBytes, isImage, getImageSize, fromNowTime } from "../../utils";
import { useAppSelector } from "../../../app/store";
import IconDownload from "../../../assets/icons/download.svg";
import IconClose from "../../../assets/icons/close.circle.svg";
import VideoMessage from "./VideoMessage";
import AudioMessage from "./AudioMessage";
import clsx from "clsx";

const isLocalFile = (content: string) => {
  return content.startsWith("blob:");
};

interface Props {
  context: "user" | "channel";
  to: number;
  created_at: number;
  from_uid: number;
  content: string;
  download: string;
  thumbnail: string;
  properties: {
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
  const { stopUploading, data, uploadFile, progress, isSuccess: uploadSuccess } = useUploadFile();
  const fromUser = useAppSelector((store) => store.users.byId[from_uid]);
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
  const handleCancel = () => {
    stopUploading();
    URL.revokeObjectURL(content);
    removeLocalMessage(properties.local_id);
  };
  if (!properties) return null;
  const icon = getFileIcon(content_type, name, "w-9 h-auto");

  if (!content || !name) return null;

  const sending = uploadingFile || isSending;
  // image
  if (isImage(content_type, size))
    return (
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
  // video
  if (content_type.startsWith("video") && !sending)
    return (
      <VideoMessage
        size={size}
        url={content}
        name={name}
        download={download}
      />
    );
  // audio
  if (content_type.startsWith("audio") && !sending)
    return (
      <AudioMessage
        size={size}
        url={content}
        name={name}
        download={download}
      />
    );
  return (
    <div className={clsx(`bg-slate-50 dark:bg-slate-900 border border-solid border-gray-300 dark:border-gray-500 box-border md:w-[370px] rounded-md`, sending && "opacity-90")}>
      <div className="px-2 py-3 flex items-center justify-between gap-2">
        {icon}
        <div className="flex flex-col gap-1 w-full overflow-hidden">
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">{name}</span>
          <span className="hidden md:flex whitespace-nowrap text-xs text-gray-500 dark:text-gray-300 gap-4">
            {sending ? (
              <Progress value={progress} width={"80%"} />
            ) : (
              <>
                <strong>{formatBytes(size)}</strong>
                <strong>{fromNowTime(created_at)}</strong>
                {fromUser && (
                  <strong>
                    by <strong className="font-bold">{fromUser.name}</strong>
                  </strong>
                )}
              </>
            )}
          </span>
        </div>
        {sending ? (
          <IconClose className="cursor-pointer" onClick={handleCancel} />
        ) : (
          <a className="hidden md:block whitespace-nowrap" download={name} href={`${content}&download=true`}>
            <IconDownload className="fill-gray-500 dark:fill-gray-400" />
          </a>
        )}
      </div>
    </div>
  );
};

export default FileMessage;
