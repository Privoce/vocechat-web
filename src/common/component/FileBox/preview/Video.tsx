import React, { FC } from "react";
import styled from "styled-components";

const Styled = styled.div`
  height: 218px;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface Props {
  url: string;
}

const Video: FC<Props> = ({ url }) => {
  return (
    <Styled>
      <video controls src={url} />
    </Styled>
  );
};

export default Video;
