import React, { useState, useEffect } from "react";
import { formatBytes, isTreatAsImage, getFileIcon } from "../../utils";

export default function FileItem({ file = null }) {
  const [icon, setIcon] = useState<React.ReactElement | null>(null);
  useEffect(() => {
    let localUrl = "";
    if (file) {
      const { type, name } = file;
      if (isTreatAsImage(file)) {
        //  use revokeObjectURL before component didMount
        localUrl = URL.createObjectURL(file);
        setIcon(<img src={localUrl} alt="thumb" className="thumb" />);
        return;
      }
      console.log("file type", type, name);
      setIcon(getFileIcon(type, name));
    }
    return () => {
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, [file]);
  console.log("current file", file);
  if (!file) return null;
  const { name, size } = file;
  return (
    <li className="item">
      {icon}
      <div className="right">
        <div className="name">
          <span className="input">{name}</span>
          {/* <i className="tip">(click title to change name)</i> */}
        </div>
        <i className="size">{formatBytes(size)}</i>
      </div>
    </li>
  );
}
