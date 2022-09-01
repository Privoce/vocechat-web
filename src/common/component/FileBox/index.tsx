import { FC, ReactElement } from "react";
import dayjs from "dayjs";
import Styled from "./styled";
import {
  VideoPreview,
  AudioPreview,
  ImagePreview,
  PdfPreview,
  CodePreview,
  DocPreview
} from "./preview";
import { getFileIcon, formatBytes } from "../../utils";
import IconDownload from "../../../assets/icons/download.svg";
import { useAppSelector } from "../../../app/store";

interface Data {
  file_type: string;
  name: string;
  content: string;
}

const renderPreview = (data: Data) => {
  const { file_type, name, content } = data;
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
  const fromUser = useAppSelector((store) => store.users.byId[from_uid]);
  const icon = getFileIcon(file_type, name);
  if (!content || !fromUser || !name) return null;
  const previewContent = renderPreview({ file_type, content, name });
  const withPreview = preview && previewContent;
  return (
    <Styled
      className={`file_box ${flex ? "flex" : ""} ${withPreview ? "preview" : ""} ${
        file_type.startsWith("audio") ? "audio" : ""
      }`}
    >
      <div className="basic">
        {icon}
        <div className="info">
          <span className="name">{name}</span>
          <span className="details">
            <i className="size">{formatBytes(size)}</i>
            <i className="time">{dayjs(created_at).fromNow()}</i>
            <i className="from">
              by <strong>{fromUser.name}</strong>
            </i>
          </span>
        </div>
        <a className="download" download={name} href={`${content}&download=true`}>
          <IconDownload />
        </a>
      </div>
      {withPreview && <div className="preview">{previewContent}</div>}
    </Styled>
  );
};

export default FileBox;
