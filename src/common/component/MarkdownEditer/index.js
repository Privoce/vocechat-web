import Editor from "rich-markdown-editor";
import styled from "styled-components";
const Styled = styled.div`
  padding-top: 8px;
  .mde {
    padding: 4px;
    height: 150px;
    > div {
      height: 100%;
      .ProseMirror {
        overflow: scroll;
        height: 100%;
        max-height: 300px;
        padding: 5px 28px;
      }
    }
  }
`;
export default function MarkdownEditer({ value, updateValue }) {
  return (
    <Styled>
      <Editor
        defaultValue={value}
        onChange={updateValue}
        autoFocus={true}
        placeholder="Type '/' to insert..."
        className="mde"
      ></Editor>
    </Styled>
  );
}
