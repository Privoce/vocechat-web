import { useState, useEffect, FC } from "react";
import styled from "styled-components";

const Styled = styled.div`
  background-color: #fff;
  height: 218px;
  padding: 15px 15px 0 15px;
  line-height: 1.4;
  overflow: scroll;
  white-space: pre-wrap;
  word-break: break-all;
`;

interface Props {
  url: string;
}

const Doc: FC<Props> = ({ url }) => {
  const [content, setContent] = useState("");
  useEffect(() => {
    const getContent = async (url: string) => {
      if (!url) return;
      const resp = await fetch(url);
      const txt = await resp.text();
      setContent(txt);
    };
    getContent(url);
  }, [url]);
  if (!content) return null;

  return <Styled>{content}</Styled>;
};

export default Doc;
