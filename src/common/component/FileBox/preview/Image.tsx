import React, { FC } from "react";
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

interface Props {
  url: string;
  alt?: string;
}

const Image: FC<Props> = ({ url, alt }) => {
  if (!url) return null;
  return (
    <Styled>
      <img src={url} alt={alt} />
    </Styled>
  );
};

export default Image;
