import { useState, useEffect } from "react";
import { formatBytes, isTreatAsImage, getFileIcon } from "../../utils";

export default function FileItem({ file = null }) {
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    if (file) {
      const { type, name } = file;
      if (isTreatAsImage(file)) {
        setIcon(
          <img src={URL.createObjectURL(file)} alt="thumb" className="thumb" />
        );
        return;
      }
      console.log("file type", type, name);
      setIcon(getFileIcon(type, name));
    }
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
