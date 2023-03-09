import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { LineWobble } from "@uiball/loaders";
interface Props {
  url: string;
  alt?: string;
}

const ImageBox: FC<Props> = ({ url, alt }) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {

    const img = new Image();
    img.onload = () => {
      setStatus("loaded");
    };
    img.onerror = () => {
      setStatus("error");
    };
    img.src = url;
  }, [url]);

  return (
    <div className={clsx("h-[218px] overflow-hidden flex-center", status == "error" && "bg-red-100 dark:bg-red-200/60")}>
      {status == "loaded" ? <img className="w-full h-full object-cover" src={url} alt={alt} /> : (
        status == "loading" ? <span><LineWobble color="rgb(21,91,117)" /></span> :
          <span className="text-lg text-red-800">Load image error</span>
      )}
    </div>
  );
};

export default ImageBox;
