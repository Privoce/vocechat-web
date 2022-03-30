import { useState, useRef } from "react";
import styled from "styled-components";
import UploadModal from "../../component/UploadModal";
import AddIcon from "../../../assets/icons/add.solid.svg";
import MarkdownIcon from "../../../assets/icons/markdown.svg";
const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  /* &.markdown {
    flex-direction: column;
  } */
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
    input {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
`;
export default function Toolbar({ toggleMode, mode, to, context }) {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const resetFiles = () => {
    setFiles([]);
    fileInputRef.current.value = "";
  };

  const handleUpload = (evt) => {
    const files = [...evt.target.files];
    console.log("files", files);
    setFiles([...evt.target.files]);
  };
  return (
    <>
      {files.length !== 0 && (
        <UploadModal
          context={context}
          files={files}
          sendTo={to}
          closeModal={resetFiles}
        />
      )}
      <Styled className={mode}>
        <div className="md" onClick={toggleMode}>
          <MarkdownIcon className={mode} />
        </div>
        <div className="add">
          <AddIcon />
          <input
            ref={fileInputRef}
            multiple={false}
            onChange={handleUpload}
            type="file"
            name="file"
            id="file"
          />
        </div>
      </Styled>
    </>
  );
}
