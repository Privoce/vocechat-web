// import React from 'react'
import { useEditorRef } from "@udecode/plate";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import styled from "styled-components";
import iconClose from "../../../assets/icons/close.circle.svg?url";

const StylePicture = styled.picture`
  position: relative;
  display: flex;
  width: fit-content;
  max-width: 240px;
  max-height: 240px;
  img {
    width: 100%;
    object-fit: cover;
  }
  .remove {
    background: none;
    position: absolute;
    top: 0;
    right: -20px;
  }
`;

export default function ImageElement({ attributes, children, element }) {
  const editor = useEditorRef();
  const path = ReactEditor.findPath(editor, element);
  const handleRemoveImage = () => {
    Transforms.removeNodes(editor, { at: path });
  };

  return (
    <StylePicture {...attributes}>
      {children}
      <img src={element.url}></img>
      <button className="remove" onClick={handleRemoveImage}>
        <img src={iconClose} alt="icon close" />
      </button>
    </StylePicture>
  );
}
