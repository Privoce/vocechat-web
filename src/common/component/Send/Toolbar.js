import { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateUploadFiles } from "../../../app/slices/ui";
import Tooltip from "../../component/Tooltip";
import AddIcon from "../../../assets/icons/add.solid.svg";
import MarkdownIcon from "../../../assets/icons/markdown.svg";
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
export default function Toolbar({ toggleMode, mode, to, context }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleUpload = (evt) => {
    const files = [...evt.target.files];
    console.log("files", files);
    const filesData = files.map((file) => {
      const { size, type, name } = file;
      const url = URL.createObjectURL(file);
      return { size, type, name, url };
    });
    dispatch(updateUploadFiles({ context, id: to, data: filesData }));
    fileInputRef.current.value = null;
    fileInputRef.current.value = "";
    // setFiles([...evt.target.files]);
  };
  return (
    <Styled className={mode}>
      <div className="md" onClick={toggleMode}>
        <Tooltip placement="top" tip="Markdown">
          <MarkdownIcon className={mode} />
        </Tooltip>
      </div>
      <Tooltip placement="top" tip="Upload">
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
}
