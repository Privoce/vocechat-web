import { useState } from "react";
import IconClose from "@/assets/icons/close.circle.svg";
type Props = {
  thumbnail?: string;
  content: string;
};

const Image = ({ thumbnail, content }: Props) => {
  const [originalVisible, setOriginalVisible] = useState(false);
  const toggleVisible = () => {
    setOriginalVisible((prev) => !prev);
  };
  return (
    <>
      {originalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="relative">
            <img className="max-w-full" src={content || thumbnail} />
            <button className="absolute -top-2 -right-2" onClick={toggleVisible}>
              <IconClose className="w-5 h-5 dark:fill-gray-300" />
            </button>
          </div>
        </div>
      )}
      <img onClick={toggleVisible} className="max-w-xs cursor-pointer" src={thumbnail || content} />
    </>
  );
};

export default Image;
