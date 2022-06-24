import { useState, useEffect, FC } from "react";
import styled from "styled-components";

const Styled = styled.div`
  height: 218px;
  padding: 15px 15px 0 15px;
  line-height: 1.4;
  overflow: scroll;
  white-space: pre-wrap;
  word-break: break-all;
  background-color: #000;
  color: #eee;
`;

interface Props {
  url: string;
}

const Code: FC<Props> = ({ url }) => {
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

export default Code;
