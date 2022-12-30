import { useState, useEffect, FC } from "react";

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

  return <div className="h-[218px] p-[15px] pb-0 bg-black text-white overflow-scroll whitespace-pre-wrap break-all leading-snug">{content}</div>;
};

export default Code;
