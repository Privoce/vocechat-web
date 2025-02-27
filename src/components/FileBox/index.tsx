import { FC, ReactElement, useEffect, useState } from "react";
import clsx from "clsx";

import { useAppSelector } from "@/app/store";
import useExpiredResMap from "@/hooks/useExpiredResMap";
import { formatBytes, fromNowTime, getFileIcon } from "@/utils";
import {
  AudioPreview,
  CodePreview,
  DocPreview,
  ImagePreview,
  PdfPreview,
  VideoPreview
} from "./preview";
import { shallowEqual } from "react-redux";
import DownloadArea from "../FileMessage/DownloadArea";

interface Data {
  file_type: string;
  name: string;
  content: string;
}

const renderPreview = (data: Data) => {
  const { file_type, name = "", content } = data;
  let preview: null | ReactElement = null;

  const checks = {
    image: /^image/gi,
    audio: /^audio/gi,
    video: /^video/gi,
    code: /(json|javascript|java|rb|c|php|xml|css|html)$/gi,
    doc: /^text/gi,
    pdf: /\/pdf$/gi
  };
  const _arr = name.split(".");
  const _type = file_type || _arr[_arr.length - 1];
  switch (true) {
    case checks.image.test(_type):
      {
        preview = <ImagePreview url={content} />;
      }
      break;
    case checks.pdf.test(_type):
      preview = <PdfPreview url={content} />;
      break;
    case checks.code.test(_type):
      preview = <CodePreview url={content} />;
      break;
    case checks.doc.test(_type):
      preview = <DocPreview url={content} />;
      break;
    case checks.audio.test(_type):
      preview = <AudioPreview url={content} />;
      break;
    case checks.video.test(_type):
      preview = <VideoPreview url={content} />;
      break;
  }
  return preview;
};

interface Props {
  preview?: boolean;
  flex: boolean;
  file_type: string;
  name: string;
  size: number;
  created_at: number;
  from_uid: number;
  content: string;
}

const FileBox: FC<Props> = ({
  preview,
  flex,
  file_type,
  name,
  size,
  created_at,
  from_uid,
  content
}) => {
  const [fetchError, setFetchError] = useState(false);
  const { isExpired, setExpired } = useExpiredResMap();
  const fromUser = useAppSelector((store) => store.users.byId[from_uid], shallowEqual);
  const icon = getFileIcon(file_type, name, "icon w-9 h-12");
  const expired = isExpired(content);
  useEffect(() => {
    const tryFetch = async (url: string) => {
      try {
        let statusNum = (await fetch(url)).status;
        if (statusNum >= 400) {
          setFetchError(true);
        }
      } catch (e) {
        console.warn(e);
        
        setFetchError(true);
      }
    };
    if (!expired && content) {
      tryFetch(content);
    }
  }, [content, expired]);
  useEffect(() => {
    if (fetchError) {
      setExpired(content);
    }
  }, [fetchError, content]);

  if (!content || expired || fetchError) return null;

  const previewContent = renderPreview({ file_type, content, name });
  const withPreview = preview && previewContent && !fetchError && !expired;

  return (
    <div
      className={clsx(
        `rounded-md border border-solid border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-900`,
        flex ? "w-full" : "w-72 md:w-[370px]",
        withPreview ? "relative overflow-hidden h-[281px]" : "h-[66px] ",
        file_type.startsWith("audio") && "h-[125px]"
      )}
    >
      <div className="w-full p-2 flex items-center justify-between gap-2">
        {icon}
        <div className="flex flex-col gap-1 w-full overflow-hidden">
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">
            {name}
          </span>
          <em className="text-xs text-gray-500 flex gap-4 not-italic">
            <span className="size">{formatBytes(size)}</span>
            <span className="hidden md:block time">{fromNowTime(created_at)}</span>
            <span>
              by <strong className="font-bold">{fromUser?.name || "Deleted User"}</strong>
            </span>
          </em>
        </div>
        <DownloadArea copyLink={content} downloadLink={`${content}&download=true`} />
      </div>
      {withPreview && <div className="h-[calc(100%_-_64px)] overflow-hidden">{previewContent}</div>}
    </div>
  );
};

export default FileBox;
