import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  height: 218px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Image({ url = "" }) {
  if (!url) return null;
  return (
    <Styled>
      <img src={url} />
    </Styled>
  );
}
