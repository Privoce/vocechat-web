import { FC, useEffect, useState } from "react";

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

  return (
    <div className="bg-white h-[218px] p-[15px] pb-0 whitespace-pre-wrap break-all">{content}</div>
  );
};

export default Doc;
