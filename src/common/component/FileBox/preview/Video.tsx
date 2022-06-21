import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  height: 218px;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Video({ url = "" }) {
  if (!url) return null;
  return (
    <Styled>
      <video controls src={url} />
    </Styled>
  );
}
