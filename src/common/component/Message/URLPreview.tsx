import { useState, useEffect } from "react";
import { useLazyGetOGInfoQuery } from "../../../app/services/message";


export default function URLPreview({ url = "" }) {
  const [favicon, setFavicon] = useState("");
  const [getInfo] = useLazyGetOGInfoQuery();
  const [data, setData] = useState<{ title: string; description: string; ogImage: string } | null>(
    null
  );
  useEffect(() => {
    const getMetaData = async (url: string) => {
      let defaultFavIcon = "";
      try {
        defaultFavIcon = `${new URL(url).origin}/favicon.ico`;
      } catch {
        defaultFavIcon = `${location.origin}/favicon.ico`;
      }
      // todo
      const { data } = await getInfo(url);
      const title = data?.title || data?.site_name || "";
      const description = data?.description || "";
      const ogImage = data?.images.find((i) => !!i.url)?.url || "";
      const favicon = data?.favicon_url || defaultFavIcon;
      setFavicon(favicon);
      setData({ title, description, ogImage });
      // console.log("wtf url", data);
    };
    getMetaData(url);
  }, [url]);
  const handleFavError = () => {
    setFavicon("");
  };
  const handleOGImageError = () => {
    setData(prev => {
      if (!prev) return prev;
      return { ...prev, ogImage: "" };
    });
  };
  if (!url || !data || !data.title) return null;
  const { title, description, ogImage } = data;

  const containerClass = `flex items-center border border-solid border-gray-300 box-border rounded-md w-[380px]`;
  const dotsClass = `overflow-hidden whitespace-nowrap text-ellipsis`;
  return ogImage ? (
    <a className={`${containerClass} flex-col !items-start p-3`} href={url} target="_blank" rel="noreferrer">
      <h3 className={`text-base text-primary-500 w-full ${dotsClass}`}>{title}</h3>
      <p className={`text-xs text-gray-400 mb-2 w-full ${dotsClass}`}>{description}</p>
      <div className="w-full h-[180px]">
        <img className="w-full h-full object-cover" onError={handleOGImageError} src={ogImage} alt="og image" />
      </div>
    </a>
  ) : (
    <a
      className={`${containerClass} gap-2  px-2 py-3`}
      href={url} target="_blank" rel="noreferrer">
      {favicon && (
        <div className="flex w-12 h-12 rounded">
          <img onError={handleFavError} className="object-contain" src={favicon} alt="favicon" />
        </div>
      )}
      <div className="flex flex-col">
        <h3 className="text-sm text-gray-900">{title}</h3>
        <p className={`text-xs text-gray-500 w-[288px] ${dotsClass}`}>{description}</p>
        <span className={`text-[10px] text-gray-500 w-[288px] ${dotsClass}`}>{url}</span>
      </div>
    </a>
  );
}
