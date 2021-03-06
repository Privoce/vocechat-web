import styled from "styled-components";
import IconPdf from "../../../assets/icons/file.pdf.svg";
import IconAudio from "../../../assets/icons/file.audio.svg";
import IconVideo from "../../../assets/icons/file.video.svg";
import IconUnknown from "../../../assets/icons/file.unknown.svg";
import IconDoc from "../../../assets/icons/file.doc.svg";
import IconCode from "../../../assets/icons/file.code.svg";
import IconImage from "../../../assets/icons/file.image.svg";
import CheckSign from "../../../assets/icons/check.sign.svg";
import { FC } from "react";

const Styled = styled.div`
  padding: 12px;
  background: #ffffff;
  min-width: 200px;
  overflow: auto;
  box-shadow: 0 24px 48px -12px rgba(16, 24, 40, 0.18);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  > .list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .type {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #475467;
      .icon {
        width: 15px;
        height: auto;
      }
      .check {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
export const FileTypes = {
  doc: {
    title: "Documents",
    icon: <IconDoc className="icon" />
  },
  pdf: {
    title: "PDFs",
    icon: <IconPdf className="icon" />
  },
  image: {
    title: "Images",
    icon: <IconImage className="icon" />
  },
  audio: {
    title: "Audio",
    icon: <IconAudio className="icon" />
  },
  video: {
    title: "Videos",
    icon: <IconVideo className="icon" />
  },
  code: {
    title: "Code Snippets",
    icon: <IconCode className="icon" />
  },
  unknown: {
    title: "Unknown Files",
    icon: <IconUnknown className="icon" />
  }
};
type Props = {
  select: number;
  updateFilter: (param: { type?: string }) => void;
};
const Type: FC<Props> = ({ select = "", updateFilter }) => {
  const handleClick = (type?: string) => {
    updateFilter({ type });
  };
  return (
    <Styled>
      <ul className="list">
        <li className="type" onClick={handleClick.bind(null, undefined)}>
          Any Type
          {!select && <CheckSign className="check" />}
        </li>
        {Object.entries(FileTypes).map(([type, { title, icon }]) => {
          return (
            <li key={title} className="type" onClick={handleClick.bind(null, type)}>
              {icon} {title}
              {select == type && <CheckSign className="check" />}
            </li>
          );
        })}
      </ul>
    </Styled>
  );
};
export default Type;
