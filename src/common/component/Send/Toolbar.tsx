import { ChangeEvent, useRef, FC } from "react";
import styled from "styled-components";
import Tooltip from "../Tooltip";
import AddIcon from "../../../assets/icons/add.solid.svg";
import MarkdownIcon from "../../../assets/icons/markdown.svg";
import FullscreenIcon from "../../../assets/icons/fullscreen.svg";
import ExitFullscreenIcon from "../../../assets/icons/fullscreen.exit.svg";
import useUploadFile from "../../hook/useUploadFile";
import { useTranslation } from "react-i18next";

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  &.markdown .add {
    display: none;
  }
  .md {
    cursor: pointer;
    display: flex;
    gap: 14px;
    .markdown path {
      fill: #22ccee;
    }
  }
  .add {
    cursor: pointer;
    position: relative;
    width: 24px;
    height: 24px;
    label {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      input {
        display: none;
      }
    }
  }
`;
type Props = {
  toggleMarkdownFullscreen: () => void;
  fullscreen: boolean;
  toggleMode: () => void;
  mode: "markdown" | "text";
  to: number;
  context: "user" | "channel";
};
const Toolbar: FC<Props> = ({
  toggleMarkdownFullscreen,
  fullscreen,
  toggleMode,
  mode,
  to,
  context
}) => {
  const { t } = useTranslation();
  const { addStageFile } = useUploadFile({ context, id: to });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;
    const files = Array.from(evt.target.files);
    const filesData = files.map((file) => {
      const { size, type, name } = file;
      const url = URL.createObjectURL(file);
      return { size, type, name, url };
    });
    addStageFile(filesData);
    // todo: check code logic
    // @ts-ignore
    fileInputRef.current.value = null;
    // @ts-ignore
    fileInputRef.current.value = "";
    // setFiles([...evt.target.files]);
  };

  return (
    <Styled className={mode}>
      <div className="md">
        <Tooltip placement="top" tip="Markdown">
          <MarkdownIcon className={mode} onClick={toggleMode} />
        </Tooltip>
        {mode == "markdown" &&
          (fullscreen ? (
            <Tooltip placement="top" tip="Exit Fullscreen">
              <ExitFullscreenIcon onClick={toggleMarkdownFullscreen} />
            </Tooltip>
          ) : (
            <Tooltip placement="top" tip="Fullscreen">
              <FullscreenIcon onClick={toggleMarkdownFullscreen} />
            </Tooltip>
          ))}
      </div>
      <Tooltip placement="top" tip={t("action.upload")}>
        <div className="add">
          <AddIcon />
          <label htmlFor="file">
            <input
              size={24}
              ref={fileInputRef}
              multiple={true}
              onChange={handleUpload}
              type="file"
              name="file"
              id="file"
            />
          </label>
        </div>
      </Tooltip>
    </Styled>
  );
};
export default Toolbar;
