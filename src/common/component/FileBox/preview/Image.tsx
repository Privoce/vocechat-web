import React, { FC } from "react";
interface Props {
  url: string;
  alt?: string;
}

const Image: FC<Props> = ({ url, alt }) => {
  return (
    <div className="h-[218px] overflow-hidden">
      <img className="w-full h-full object-cover" src={url} alt={alt} />
    </div>
  );
};

export default Image;
