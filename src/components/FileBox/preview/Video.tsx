import React, { FC } from "react";
interface Props {
  url: string;
}

const Video: FC<Props> = ({ url }) => {
  return (
    <div className="h-[218px]">
      <video className="w-full h-full object-cover" controls src={url} />
    </div>
  );
};

export default Video;
