import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { LineWobble } from "@uiball/loaders";

import { useLazyPreCheckFileFromUrlQuery } from "@/app/services/message";
interface Props {
  url: string;
  alt?: string;
}

const ImageBox: FC<Props> = ({ url, alt }) => {
  const [loadFile, { error, isSuccess }] = useLazyPreCheckFileFromUrlQuery();
  const [status, setStatus] = useState<"loading" | "loaded" | "error" | number>("loading");

  useEffect(() => {
    if (url) {
      loadFile(url);
    }
  }, [url]);
  useEffect(() => {
    // 预检成功
    if (isSuccess && url) {
      const img = new Image();
      img.onload = () => {
        setStatus("loaded");
      };
      img.onerror = () => {
        setStatus("error");
      };
      img.src = url;
    }
    // 预检失败
    if (error) {
      const errNum = (error as FetchBaseQueryError).status;
      console.log("error num", errNum);
      switch (errNum) {
        case 404:
          setStatus(404);
          break;

        default:
          // setStatus("error");
          break;
      }
    }
  }, [isSuccess, error, url]);


  return (
    <div className={clsx("h-[218px] overflow-hidden flex-center", status == "error" && "bg-red-100 dark:bg-red-200/60")}>
      {status == "loaded" ? <img className="w-full h-full object-cover" src={url} alt={alt} /> : (
        status == "loading" ? <span><LineWobble color="rgb(21,91,117)" /></span> :

          status == 404 ? <span className="text-lg text-orange-500">File not found, removed maybe</span> : <span className="text-lg text-red-800">Load image error</span>
      )}
    </div>
  );
};

export default ImageBox;
