// import React from 'react'
import styled from "styled-components";

import AddIcon from "../../../assets/icons/add.solid.svg";
import MarkdownIcon from "../../../assets/icons/markdown.svg";
const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  .md {
    cursor: pointer;
    display: flex;
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
export default function Toolbar({
  contentType = "text",
  updateContentType,
  handleUpload,
  handleSend,
}) {
  const toggleMarkdown = () => {
    updateContentType(contentType == "markdown" ? "text" : "markdown");
  };
  return (
    <Styled>
      <div className="md" onClick={toggleMarkdown}>
        {contentType == "markdown" ? <MarkdownIcon /> : <MarkdownIcon />}
      </div>
      <div className="add">
        <AddIcon />
        <input
          multiple={true}
          onChange={handleUpload}
          type="file"
          name="file"
          id="file"
        />
      </div>
    </Styled>
  );
}
